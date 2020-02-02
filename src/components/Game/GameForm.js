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
  const [winCounter, setWinCounter] = useState(0);
  const [socket, setSocket] = useState(); // Saving Socket
  const [winPoints, setWinPoints] = useState(0);
  /**
   * Handling count for counter
   */
  const handleOnClick = () => {
    //Sending click for server
    socket.emit("game");
    socket.emit("serverpoints");
    didWin = false;
    socket.on("number", data => {
      setCounter(data.playerPoints);
      if (didWin === false) {
        if (data.points > 0) {
          setWinPoints(data.points);
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
    //Listening for points. This socket will tell how many points are needed to next win
    sock.getSocket().on("points", data => {
      setWinCounter(data);
    });
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
      <form>
        {winPoints > 0 && (
          <div class="alert alert-success">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setWinPoints(0)}
            >
              &times;
            </button>
            <strong>VOITTO!</strong> VOITIT {winPoints}
          </div>
        )}

        <div className="illustration"></div>
        <div className="form-group">
          <Counter counter={counter} />
          <Counter counter={winCounter} />
        </div>
        <div className="form-group">
          <div onClick={handleOnClick} className="button">
            <a style={{ color: "black", outline: 0 }}>Paina</a>
          </div>
        </div>
      </form>
    </div>

    /*
    <div className="login-clean">
      <div className="form-group">
        {winPoints > 0 && (
          <div class="alert alert-success">
            <strong>VOITTO!</strong> VOITIT {winPoints}
          </div>
        )}
        <a>{getUSERNAME()}</a>
        <div className="container">
         
          
        </div>
      </div>
    </div>
    */
  );
};

export default GameForm;
