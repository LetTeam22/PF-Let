import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { Filters } from '../Filters/Filtes'
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';
import { getBikes } from '../../Redux/actions/'
// import { NotFound } from '../NotFound/NotFound'
import s from './Home.module.css';


export const Home = () => {

    const dispatch = useDispatch();
    let allBikes = useSelector(state => state.allBikes);
    const currentPage = useSelector(state => state.currentPage);
    const useFilters = useSelector(state => state.useFilters)
    const type = useSelector(state => state.type);
    const traction = useSelector(state => state.traction);


    // defino qué renderizar según filtros
    let bikes = []
    if (!useFilters.type && !useFilters.wheeelSize && !useFilters.color && !useFilters.name) bikes = [...allBikes];
    if (useFilters.type) bikes = [...type];
    if (useFilters.traction) bikes = [...traction];

    // paginado
    const bikesPerPage = 9;
    const indexLastBike = currentPage * bikesPerPage;
    const indexFirstBike = indexLastBike - bikesPerPage;
    const currentBike = bikes.slice(indexFirstBike, indexLastBike);

    // info desde back en primer renderizado
    if (!bikes.length) dispatch(getBikes());

    // defino loading 
    let loading = false;
    if (!bikes.length) loading = true;

    return (
        <div className={s.container}>
            {loading && <Loading />}
            <div className={s.encabezado}>
            
            </div>
            <div className={s.inicio}>
                <div className={s.dselect}>
                    <label style={{marginRight:"1rem"}}>Ordenar por:</label>
                    <select className={s.select} name="" id="">Ordenar</select>
                </div>
            </div>
            <div className={s.wrapper}>
                <div className={s.filtros}>
                    <h4 className={s.filtrosTitulo}>Filtros</h4>
                </div>
                <div className={s.filterwrapp}>
                    <Filters />
                    <div className={s.filter}> {/*esto es provisorio hasta tener filtros listos*/}
                        <h4>Fecha</h4>
                        <label>Desde:</label>
                        <br />
                        <select style={{width:"10rem"}} name="" id=""></select>
                        <br />
                        <label>Hasta:</label>
                        <br />
                        <select style={{width:"10rem"}}name="" id=""></select>
                    </div>
                    <div className={s.filter}>
                        <h4>Precio</h4>
                    </div>
                    <div className={s.filter}>
                        <h4>Tracción</h4>
                    </div>
                    <div className={s.filter}>
                        <h4>Tipo</h4>
                    </div>
                </div>
                <div>
                    {bikes.length && <Pagination bikes={bikes.length} bikesPerPage={bikesPerPage} />}
                </div>
                {!loading && !!currentBike.length &&
                    <div style={{ display: "grid" }}>
                        {currentBike?.map(e => (
                            <div key={e.idBike} >
                                <Link to={'/bike/' + e.idBike}>
                                    <Card
                                        key={e.idBike}
                                        name={e.name}
                                        type={e.type}
                                        image={e.image}
                                        traction={e.traction}
                                        wheelSize={e.wheelSize}
                                        price={e.price}
                                        rating={e.rating}
                                        color={e.color}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div style={{display:"block", border:"2px solid blue", height:"30rem"}}>
                <h1>ACCESORIOS</h1>
            </div>
        </div>

    )
};