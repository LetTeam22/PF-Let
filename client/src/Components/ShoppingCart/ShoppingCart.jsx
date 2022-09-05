import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAccesories, getBikes, getUser, postBookings, setParameters } from "../../Redux/actions";
import s from "./ShoppingCart.module.css";
import Dates from "../Dates/Dates";
import swal from "sweetalert";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import sincarrito from '../../image/sincarrito.png'
import RenderOneImage from '../Cloudinary/renderOneImage';
import RenderAccCart from "../Cloudinary/renderAccCart";
import emailjs from '@emailjs/browser';
import { BiTrash } from 'react-icons/bi';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


export const ShoppingCart = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  let bookings = JSON.parse(localStorage.getItem("booking")) || [];
  const date = useSelector((state) => state.parameters.date);
  const userLogged = useSelector((state) => state.user);
  const allAccs = useSelector((state) => state.accesories);
  const allBikes = useSelector((state) => state.allBikes);
  let cartBikes = [];
  const { user, isLoading, isAuthenticated } = useAuth0();


  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getBikes());
    dispatch(getAccesories());
    dispatch(getUser(user?.email));
  }, [dispatch]);


  if (isLoading) return <Loading />;

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
            calzado: book.calzado,
            totalAcc: book.totalAcc,
          },
        };
        cartBikes.push(pushedbike);
      }
  }

  let postbikeIds = cartBikes.map((bikes) => bikes.idBike);

  let postedBooking = {
    startDate: date.from,
    endDate: date.to,
    userId: userLogged?.idUser,
    bikeIds: postbikeIds,
  };

  const llenarAccs = (accs) => {
    let accesories = [];
    for (let acc in accs) {
      if (accs[acc] === true) {
        for (let acces of allAccs) {
          if (acces.name.toLowerCase() === acc) {
            accesories.push(acces);
          }
        }
      }
    }
    return accesories;
  };

  const totalDias = (from, to) => {
    const date1 = new Date(from);
    const date2 = new Date(to);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalPerBike = (price) => {
    const days = totalDias(date.from, date.to);
    return price * days;
  };

  const subTotal = cartBikes.reduce((acc, cur) => {
    return (
      acc +
      (cur.price + cur.accesories.totalAcc) * totalDias(date.from, date.to)
    );
  }, 0);

  const total = subTotal * 1.02;

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: user.email }, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  const handleBooking = (e) => {
    if (!isAuthenticated) {
      swal({
        title: "PRECAUCION",
        text: "Debes loguearte primero",
        icon: "warning",
        button: {
          text: "Ok",
          value: true,
          visible: true,
          className: s.btnSwal,
          closeModal: true,
        },
      });
    } else {
      dispatch(setParameters("resetAll"));
      dispatch(postBookings({ ...postedBooking, totalPrice: total }));
      localStorage.removeItem("booking");
      swal({
        title: "Tu reserva fue confirmada!",
        text: "Disfruta tu aventura!",
        icon: "success",
        button: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: s.btnSwal,
            closeModal: true,
          },
        },
      });
      sendEmail(e)
      history.push("/home");
    }
  };

  const handleResetDate = () => {
    dispatch(setParameters("resetAll"));
  };

  const deleteItem = (e, id) => {
    e.preventDefault();
    cartBikes = cartBikes.filter(b => b.idBike !== id)
    localStorage.setItem('booking', JSON.stringify(bookings.filter(booking => booking.bike !== id.toString())));
  }


  return (
    <div className={s.container}>
      <div className={s.titleDiv}>
        <h1 className={s.title}>Carrito de compras</h1>
      </div>
      <hr color="#595858" size='0.5px' />

      <Dates className={s.dates} />
  <div className={s.containerDiv}>
      <TableContainer className={s.table} sx={{ minWidth: 700, width: '30%', marginLeft: '2rem' }}>
        <Table sx={{ minWidth: 700, width: '30%' }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio/dia</TableCell>
              <TableCell align="center">Precio Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartBikes.length 
              ? cartBikes.map((bike) => {
                return (
                  <TableRow key={bike.bikeId} >
                    <TableCell>{bike.name}</TableCell>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">{bike.price}</TableCell>
                    <TableCell align="center">{totalPerBike(bike.price)}</TableCell>
                  </TableRow> 
                )})
              : <></>  
              }
              {
                cartBikes.length 
                ? cartBikes.map(bike => {
                  return llenarAccs(bike.accesories)?.map(el => {
                    return (
                        <TableRow key={el.idAcc} >
                          <TableCell>{el.name}</TableCell>
                          <TableCell align="center">1</TableCell>
                          <TableCell align="center">{el.price}</TableCell>
                          <TableCell align="center">{totalPerBike(el.price)}</TableCell>
                        </TableRow> 
                    )
                  })
                })
                : <></>
              }
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell align="left" colSpan={2}>Subtotal</TableCell>
              <TableCell align="center">{subTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="left">Tax</TableCell>
              <TableCell align="center">{subTotal * 0.02}</TableCell>
          </TableRow>
            <TableRow>
              <TableCell align="left" colSpan={2}>Total</TableCell>
              <TableCell align="center">{!isNaN(total) ? total : 0}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </TableContainer>
    {/* <div className={s.previewItems}> */}
      {
        // cartBikes.length 
        // ? cartBikes.map(bike => {
        //   // return (
        //   //   <div key={bike.idBike}>
        //   //       <div className={s.cardBike}>
        //   //         <h2 className={s.bikeName}>{bike.name}</h2>
        //   //         <RenderOneImage publicId={bike.image} className={s.img} />
        //   //         <div className={s.accesories}>
        //   //           {llenarAccs(bike.accesories)?.map((el) => (
        //   //           <div>
        //   //               {/* <p className={s.accs} key={el.name}> {el.name} </p> */}
        //   //               <RenderAccCart
        //   //                 className={s.imgCloud}
        //   //                 publicId={el.image}
        //   //               />
        //   //           </div>
        //   //           ))}
        //   //         </div>
        //   //         <button onClick={(e) => deleteItem(e, bike.idBike)} className={s.deleteBtn}><BiTrash color='#F9B621' size='2rem' className={s.trashIcon} /></button>
        //   //       </div>
        //   //   </div>
        //   //   );
        // }) 
        // : <></>
      }
    {/* </div> */}
  </div>
    <div>
    {cartBikes.length ? (
            <div className={s.totalPrice}>
              <div className={s.containerBtn}>
                <Link to="/home">
                  <button onClick={handleResetDate} className={s.reserveBtn}>
                    Buscar mas Bicicletas
                  </button>
                </Link>
                {!isNaN(total) ? (
                  <h2 className={s.total}>{`Total $ ${total}`}</h2>
                ) : (
                  <></>
                )}
                <button
                  disabled={
                    postedBooking.startDate === "" ||
                      postedBooking.endDate === "" ||
                      !postedBooking.bikeIds.length
                      ? true
                      : false
                  }
                  onClick={(e) => handleBooking(e)}
                  className={s.reserveBtn}
                >
                  RESERVAR
                </button>
              </div>
              
            </div>
          ) : (
            <></>
          )}
    </div>
          
    </div>
  );
};
