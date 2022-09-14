import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import s from "./AdminProfile.module.css";
import Loading from "../../Loading/Loading";
import FormBike from "./FormBike";
import FormAccesories from './FormAccesories';
import FormPriceBike from "./FormPriceBike";

export const AdminProfile = () => {
  const { isLoading, user } = useAuth0();
  const history = useHistory();
  const [addBike, setAddBike] = useState(false);
  const [addAcc, setAddAcc] = useState(false);
  const [addPrice, setAddPrice] = useState(false);
  const inflationIcon = 'https://res.cloudinary.com/pflet/image/upload/v1663093017/Let/image/amarillo_bgypp5.png'
  const background = "https://res.cloudinary.com/pflet/image/upload/v1662686161/Let/image/fondo_huellas_u2a4wr.png"
  if (isLoading) return <Loading />;
  if (!user) history.goBack();

  const seeBookings = () => {
    history.push("/adminprofile/bookings");
  };

  const seeUsers = () => {
    history.push("/adminprofile/users");
  };

  const seeBikes = () => {
    history.push("/adminprofile/bikes");
  };

  const seeExperiences = () => {
    history.push("/adminprofile/experiences");
  };

  const seeAccesories = () => {
    history.push("/adminprofile/accesories");
  };

  const addBikes = () => {
    addBike ? setAddBike(false) : setAddBike(true);
  };
  const addAccs = () => {
    addAcc ? setAddAcc(false) : setAddAcc(true)
  }
  return (
    <section className={s.allPage}>
      <div className={s.column}>
        <div>
          <h1>Reservas</h1>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeBookings}
          >
            Ver reservas
          </Button>
        </div>
        <div>
          <h1>Usuarios</h1>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeUsers}
          >
            Ver usuarios
          </Button>
        </div>
      </div>

      <div className={s.column}>
        <div>
          <h2>Bicicletas</h2>
          <div className={s.couple}>
            <Button
              variant="contained"
              color="success"
              className={s.btnBook}
              onClick={seeBikes}
            >
              Ver Bicicletas
            </Button>
            <div className={s.buttons}>
            <AddCircleIcon
              className={s.addBtn}
              color="primary"
              onClick={addBikes}
              />
            <img src={inflationIcon} alt="aumentar precio" onClick={() => addPrice? setAddPrice(false): setAddPrice(true)} />
              </div>
          </div>
        </div>
        <div>
          <h2>Experiencias</h2>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeExperiences}
          >
            Ver Experiencias
          </Button>
        </div>
        <div>
          <h2>Accesorios</h2>
            <div className={s.couple}>
              <Button
                variant="contained"
                color="success"
                className={s.btnBook}
                onClick={seeAccesories}
              >
                Ver Accesorios
              </Button>
              <AddCircleIcon
                  className={s.addBtn}
                  color="primary"
                  onClick={addAccs}
                />
              </div>
        </div>
      </div>
      <div className={addBike ? s.show : s.hidde}>
        <FormBike setAddBike={setAddBike} />
      </div>
      <div className={addAcc ? s.show : s.hidde}>
        <FormAccesories setAddAcc={setAddAcc} />
      </div>
      <div className={addPrice ? s.show : s.hidde}>
        <FormPriceBike setAddPrice={setAddPrice}/>
      </div>
      <img
        src={background}
        alt="fondo"
        className={s.background}
      />
    </section>
  );
};
