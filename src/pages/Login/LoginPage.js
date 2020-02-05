import React, { useState, useEffect } from "react";
import LoginForm from "../../components/Login/LoginForm";
import logo from "../../assets/Koodarijahti_tunnus.svg";
import { SERVER } from "../../Connect";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/styles.css";
import "../../styles/styles.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [players, setPlayers] = useState(0);

  const playersOnline = async () => {
    const data = await fetch(SERVER + "/playersonline");
    const { online } = await data.json();
    setPlayers(online);
  };

  useEffect(() => {
    playersOnline();
  }, []);

  return (
    <div className="body">
      <img src={logo} alt="Coding Duck" className="img" />
      <a>{players} Pelaajaa pelissä</a>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
