import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";

export default function Account() {
  // esta constante sirve para establecer el estado de logueo
  const [login, setLogin] = useState(null);

  // con este hook validamos el estado de logueo
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  // con este condicional validamos que esta en espera de loguearse
  if (login === null) return <Loading isVisible={true} text="Cargando..." />;

  // con este return, asignamos el componente de logueo o no logueo
  return login ? <UserLogged /> : <UserGuest />;
}
