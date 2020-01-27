import React, { useState } from "react";
import Counter from "../../components/Game/Counter";

const GameForm = () => {
  //Counter
  const [counter, setCounter] = useState(20);
  /**
   * Handling count for counter
   */
  const handleOnClick = () => {
    
    setCounter(counter === 0 ? 20 : counter -1);
    console.log(counter);
  };
  return (
    <div className="login-clean">
      <div className="container">
        <Counter counter={counter} />
        <button onClick={handleOnClick} className="button">
          <a style={{ color: "black",outline:0 }}>Paina</a>
        </button>
      </div>
    </div>
  );
};

export default GameForm;
