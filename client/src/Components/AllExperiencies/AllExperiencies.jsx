import React, { useEffect } from 'react';
import s from './AllExperiencies.module.css';
import { CardExperience } from './CardExperiences';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExperiences } from '../../Redux/actions';
import Loading from '../Loading/Loading';
import { reverseDate } from '../../helpers/convertDate.js';
import Chatbot from "../ChatBot/ChatBot";

export const AllExperiencies = ({socket}) => {

    const dispatch= useDispatch();
    const allExperiences = useSelector((state) => state.allExperiences)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() =>{
        dispatch(getAllExperiences())
    }, [dispatch])
    
    return (
        <>
        <Chatbot/>
            <div className={s.left}></div>
            <div className={s.right}></div>
            <div className={s.container}>
                <h1 className={s.h1}>LOS LET EN PRIMERA PERSONA</h1>
            </div>
            { allExperiences.length ? allExperiences.filter(e => e.status === 'active').map((e) =>{
                    return (
                        <CardExperience
                            key = {e.idExperience}
                            firstName= {e.firstName}
                            imgExperience={e.imgExperience}
                            textExperience={e.textExperience}
                            startDate={reverseDate(e.booking.startDate)}
                            endDate={reverseDate(e.booking.endDate)}
                            bikes={e.booking.bikes}
                            socket={socket}
                            email={e.email}
                            numberOfLikes={e.numberOfLikes}
                        />
                    )
            }) : <Loading/> }
        </>
    )
};
