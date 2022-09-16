import React from 'react';
import s from './Experiencies.module.css';
// import experiencies from '../../image/experiencias1.png';

export const Experiencies = () => {
    const experiencies = 'https://res.cloudinary.com/pflet/image/upload/v1662730961/Let/image/experiencias1_nraf3v.png'
    return (
        <div className={s.experiencies}>
            <span className={s.title}>EXPERIENCIAS</span>
            <p className={s.text}>Conocé las experiencias de otras personas y compartí tu aventura con bicis let's GO</p>
            <h1 className={s.h1}>0% emisión 100% emoción</h1>
            <img src={experiencies} alt="experiencies" className={s.imgExperiencies} />
        </div>
    )
};