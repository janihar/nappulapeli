import React from "react";
import "../../styles/playbutton.css";
import "../../styles/styles.css";
import logo from "../../assets/Koodarijahti_tunnus.svg";
import GameForm from "../../components/Game/GameForm";

const GamePage = props => {
  return (
    <div className="body">
      <img src={logo} alt="Coding Duck" className="img" />
      <GameForm />
    </div>
  );
};

export default GamePage;
