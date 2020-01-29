import React, { useState, useEffect } from "react";
import Counter from "../../components/Game/Counter";
import socketIOClient from "socket.io-client";
import { stringify } from "flatted/esm";
//Endpoint
const endPoint = "http://localhost:8080";
let socket;
const GameForm = name => {
  //Counter
  const [counter, setCounter] = useState(20);
  /**
   * Handling count for counter
   */
  const handleOnClick = () => {
    //Sending click for server
    socket.emit("game");
    //Then refreshing our value

    setCounter(counter - 1);

    //Checking if we won
    socket.on("number", data => {
      if (data !== 0) {
        setCounter(counter + data);
      }
      //console.log("You won: ", )
      localStorage.setItem("COUNTER", counter);
    });
  };

  //Similar to componentDidMount (for OldSchool pals)
  //Functions passed to useEffect are executed on
  //every component rendering—unless you pass a second argument to it.
  useEffect(() => {
    if (socket !== null) {
      socket = socketIOClient(endPoint, { query: { name, socket } });
      console.log(socket);
      //localStorage.setItem("SOCKET", JSON.stringify(socket));
      //localStorage.setItem("COUNTER", 20);
      setCounter(localStorage.getItem("COUNTER"));
    } else {
      console.log("sadasd");
    }
  }, []);
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
