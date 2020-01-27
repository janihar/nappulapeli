import React, { useState } from "react";
import logo from "../../assets/vincit_logo_red.jpg";
import { Link } from "react-router-dom";
import Counter from "../../components/Game/Counter";

const GameForm = () => {
  //Counter
  const [counter, setCounter] = useState(20);
  /**
   * Handling count for counter
   */
  const handleOnClick = () => {
    
    setCounter(counter == 0 ? 20 : counter -1);
    console.log(counter);
  };
  return (
    <div class="login-clean">
      <div class="container">
        <Counter counter={counter} />
        <div onClick={handleOnClick} class="button">
          <a style={{ color: "black" }}>Paina</a>
        </div>
      </div>
    </div>
  );
};

export default GameForm;
