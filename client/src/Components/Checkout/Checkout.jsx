import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setParameters, postBookings } from "../../Redux/actions";
import emailjs from '@emailjs/browser';
// import { useAuth0 } from "@auth0/auth0-react";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Checkout() {

    console.log(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY);

    const dispatch = useDispatch();
    const history = useHistory();
    // const { user } = useAuth0();

    const userEmail = localStorage.getItem('email');

    const sendEmail = () => {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: userEmail }, PUBLIC_KEY)
            .then((result) => {
            }, (error) => {
            })
    }

    const booking = JSON.parse(localStorage.getItem('postedBooking'));
   
    async function sendEmailAndPostBooking() {
        await sendEmail();
        await dispatch(setParameters("resetAllPlusDates"));
        await dispatch(postBookings(booking))
    };

    useEffect(() => {
        try {
            sendEmailAndPostBooking();
            window.scrollTo(0, 0);
            localStorage.removeItem("booking");
            localStorage.removeItem("date");
            localStorage.removeItem("adventure");
            history.push('/home');
        } catch (error) {
            console.log(error)
            //Aqui lo mandan al componente que van a crear con la imagen y el boton
        }
    },)

    return (
        <>
            <h1>
                Felicidades por tu compra
            </h1>
        </>
    )
}