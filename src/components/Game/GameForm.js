import React, { useState, useEffect, useRef } from "react";
import Counter from "../../components/Game/Counter";
import socketIOClient from "socket.io-client";
import Flatted, { stringify } from "flatted/esm";
import Socket from "./Connection";
//Endpoint
let didWin = false;
const GameForm = props => {
  //Counter
  const [counter, setCounter] = useState(20); //Our game counter
  const [socket, setSocket] = useState(); // Saving Socket
  /**
   * Handling count for counter
   */
  const handleOnClick = () => {
    //Sending click for server
    socket.emit("game");
    didWin = false;
    socket.on("number", data => {
      setCounter(data.playerPoints);
      if (didWin === false) {
        if (data.points > 0) {
          alert("VOITTO");
        } else {
          setCounter(data.playerPoints);
        }
        didWin = true;
      }
      //setCounter(data);
      //localStorage.setItem("COUNTER", counter);
    });
  };

  //Similar to componentDidMount (for OldSchool pals)
  //Functions passed to useEffect are executed on
  //every component rendering—unless you pass a second argument to it.
  useEffect(() => {
    console.log("Saving Socket...");
    var name = getUSERNAME();
    const sock = new Socket(name, localStorage.getItem("COUNTER"));
    setSocket(sock.getSocket());
    //LocalStorage will use string as a type of storage so therefore convert string to integer
    setCounter(parseInt(localStorage.getItem("COUNTER")));
  }, []);

  useEffect(() => {
     localStorage.setItem("COUNTER", counter);
  }, [counter]);

  //Get USERNAME from localStorage
  const getUSERNAME = () => {
    let USERNAME = localStorage.getItem("USERNAME");
    return USERNAME;
  };

  return (
    <div className="login-clean">
      <div className="container">
        <Counter counter={counter} />
        <button onClick={handleOnClick} className="button">
          <a style={{ color: "black", outline: 0 }}>Paina</a>
        </button>
        <a>{getUSERNAME()}</a>
      </div>
    </div>
  );
};

export default GameForm;
