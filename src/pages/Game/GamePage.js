import React from "react";
import "../../styles/playbutton.css";
import "../../styles/gamepage.css";
import logo from "../../assets/Koodarijahti_tunnus.svg";
import GameForm from "../../components/Game/GameForm";

const GamePage = () => {
  return (
    <div class="body">
      <img src={logo} />
      <GameForm />
    </div>
  );
};

export default GamePage;
