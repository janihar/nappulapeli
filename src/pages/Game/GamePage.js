import React, { useState } from "react";
import logo from "../../assets/Koodarijahti_tunnus.svg";
import GameForm from "../../components/Game/GameForm";
import { Redirect } from "react-router-dom";
import { LOCALLOGOUT, SERVERLOGOUT } from "../../Connect";
import "../../styles/playbutton.css";
import "../../styles/styles.css";
import "../../styles/gamepage.css";

const GamePage = props => {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = async () => {
    const data = await fetch(LOCALLOGOUT + localStorage.getItem("USERNAME"));
    const status = await data.status;
    //Succesfull
    if (status === 200) {
      setLoggedIn(false);
    }
  };
  //User has pressed logout button and succesfully deleted user
  if (loggedIn === false) {
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("COUNTER");
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      ></Redirect>
    );
  }

  return (
    <div className="body">
      <img src={logo} alt="Coding Duck" className="img" />
      <button className="button" onClick={handleLogout}>
        Kirjaudu ulos
      </button>
      <GameForm />
    </div>
  );
};

export default GamePage;
