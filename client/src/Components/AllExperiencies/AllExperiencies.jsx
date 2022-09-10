import React, { useEffect } from 'react';
import s from './AllExperiencies.module.css';
import CardExperience from '../CardsExperiences/CardExperiences';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExperiences } from '../../Redux/actions';
import Loading from '../Loading/Loading';

export const AllExperiencies = () => {
    const dispatch= useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() =>{
        dispatch(getAllExperiences())
    }, [dispatch])
    const allExperiences= useSelector((state) => state.allExperiences)

    return (
        // <img src={aux_exp} alt='aux_exp' className={s.img_aux} />
        <div>
            <div className={s.container}>
            <h1 className={s.h1}>Las Let en primera persona</h1>
            </div>
            {

                allExperiences.length? allExperiences.map((e) =>{
                    return (
                        <CardExperience
                        imgExperience={e.imgExperience}
                        textExperience={e.textExperience}
                        />
                    )

                })
                :
                <Loading/>  
            }

        </div>
    )
};
