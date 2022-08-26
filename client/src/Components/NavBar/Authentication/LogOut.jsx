import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import s from './LogOut.module.css';
import { useHistory } from "react-router-dom";
import logedPerson from '../../../image/persona_logueada.jpeg';

export default function LogOut() {
  const { logout, user } = useAuth0();
  const history = useHistory();
  return (
    <>
      <span
        onClick={() => logout({ returnTo: window.location.origin })}
        className={s.loginSpan}
      >
        Log out
      </span>
      <div className={s.containerLog}>
        <button className={s.personaBtn} onClick={() => history.push('/profile')}>
          <img src={logedPerson} className={s.persona} alt="persona"></img>
        </button>
        <span className={s.name}>{user.name}</span>
      </div>
    </>
  );
}
