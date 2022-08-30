import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getBikes, getUser, postBookings } from "../../Redux/actions";
import s from './ShoppingCart.module.css';
import Dates from "../Dates/Dates";
import swal from 'sweetalert';


export const ShoppingCart = () => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const bookings = useSelector((state) => state.bookings);
    const date = useSelector((state) => state.parameters.date);
    const user = useSelector((state) => state.user);
    const allBikes = useSelector((state) => state.allBikes);
    let cartBikes = [];
    
    useEffect(() => {
        dispatch(getBikes())
            window.scrollTo(0, 0)
    }, [dispatch])

    useEffect(() => {
        dispatch(getUser(JSON.parse(localStorage.getItem('user')).email))
    }, [dispatch])
    
    for (let bike of allBikes) {
        for (let book of bookings)
            if (bike.idBike === parseInt(book.bike, 10)) {
                let pushedbike = {
                    idBike: bike.idBike,
                    name: bike.name,
                    price: parseInt(bike.price, 10),
                    image: bike.image,
                    accesories: {
                        canasto: book.canasto,
                        silla: book.silla,
                        luces: book.luces,
                        casco: book.casco,
                        candado: book.candado,
                        lentes: book.lentes,
                        botella: book.botella,
                        calzado: book.calzado
                    }
                }
                cartBikes.push(pushedbike)
            }
    }

    let postbikeIds = cartBikes.map(bikes => bikes.idBike)

    let postedBooking = {
        startDate: date.from,
        endDate: date.to,
        userId: user?.idUser,
        bikeIds: postbikeIds
    }

    

    const llenarAccs = (accs) => {
        let accesories = [];
        for(let acc in accs) {
            if(accs[acc] === true) {
                accesories.push(acc);
            }
        }
        return accesories;
    }

    const totalDias = (from, to) => {
        const date1 = new Date(from);
        const date2 = new Date(to);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    const totalPerBike = (price) => {
        const days = totalDias(date.from, date.to);
        return (price * days);
    }

    const total = cartBikes.reduce((acc, cur) => {
        return acc + (cur.price * totalDias(date.from, date.to))
    }, 0)
      

    const handleBooking = (e) => {
        dispatch(postBookings(postedBooking));
        swal({
            title: "Tu reserva fue confirmada!",
            text: "Disfruta tu aventura!",
            icon: "success",
            button: "Aww yiss!",
        });
        history.push('/')
    }

    return (
        <div className={s.container} >

            <h1 className={s.title}>Carrito de compras</h1>

            <div className={s.bikes} >
                {
                    cartBikes.length ? cartBikes.map(bike => {
                        return (
                            <div key={bike.idBike} >
                                <div className={s.cardBike} >
                                    <h2 className={s.bikeName}>{bike.name}</h2>
                                    <img src={bike.image} alt="not found" className={s.img} />
                                    <p className={s.prices} >$ {bike.price} / día </p>
                                    <div className={s.accesories}>
                                        {
                                            llenarAccs(bike.accesories)?.map(el => <p className={s.accs}>{el}</p>)
                                        }
                                    </div>
                                    <p className={s.prices}>{`Subtotal: $ ${isNaN(totalPerBike(bike.price)) ? 0 : totalPerBike(bike.price)}`}</p>
                                </div>

                            </div>
                        )
                    }) :

                        <div className={s.empty}>
                            <h2 className={s.titleEmpty}>Aún no cargaste nada en el carrito </h2>
                            <Link to='/home'>
                                <button className={s.btn}> Volver al Home</button>
                            </Link>
                        </div>
                }
            </div>
            
            {
                cartBikes.length ?
                <div className={s.totalPrice} >

                    <Dates />

                    {
                        !isNaN(total) ? <h2 className={s.total}>{`Total $ ${total}`}</h2> : <></>
                    }

                    <div className={s.containerBtn}>
                        <Link to='/home'>
                            <button className={s.reserveBtn}>Buscar mas Bicicletas</button>
                        </Link>
                        <button 
                            disabled={postedBooking.startDate === '' || postedBooking.endDate === '' || postedBooking.userId === undefined || !postedBooking.bikeIds.length ? true : false}  
                            onClick={e => handleBooking(e)}
                            className={s.reserveBtn}
                        >RESERVAR</button>
                    </div>
                </div>
                : <></>
            }
        </div>
    )
};

