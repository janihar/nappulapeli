import React, { useState, useEffect, useRef } from "react";
import Counter from "../../components/Game/Counter";
import socketIOClient from "socket.io-client";
import Flatted, { stringify } from "flatted/esm";
import Socket from "./Connection";
import Scoreboard from "./Scoreboard";
import { LOCALRESTARTGAME, SERVERRESTARTGAME } from "../../Connect";
//Endpoint
let didWin = false;
const GameForm = () => {
  //Counter
  const [counter, setCounter] = useState(20); //Our game counter
  const [winCounter, setWinCounter] = useState(0);
  const [socket, setSocket] = useState(); // Saving Socket
  const [winPoints, setWinPoints] = useState(0);
  const [hasNoPoints, setHasNoPoints] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [close, setClose] = useState(false);
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
          if (data.playerPoints === 0) {
            setHasNoPoints(true);
          }
        }
        didWin = true;
      }
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
      setPlayerList(data.playerlist);
      setWinCounter(data.win);
    });
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setHasNoPoints(true);
      setClose(true);
    }
    localStorage.setItem("COUNTER", counter);
  }, [counter]);

  //Get USERNAME from localStorage
  const getUSERNAME = () => {
    let USERNAME = localStorage.getItem("USERNAME");
    return USERNAME;
  };
  //Restarting game from 0 to 20
  const handleRestart = async event => {
    event.preventDefault();
    if (counter == 0) {
      const data = await fetch(LOCALRESTARTGAME + getUSERNAME());
      const res = await data.json();
      setHasNoPoints(false);
      setCounter(res.points);
    }
  };

  return (
    <div className="login-clean">
      <form onSubmit={handleRestart}>
        {winPoints > 0 && close === false && (
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
            <strong>VOITTO!</strong> VOITIT {winPoints} pistettä
          </div>
        )}

        {hasNoPoints === true && (
          <div class="alert alert-danger">
            <strong>HÄVISIT</strong> Haluatko pelata uudelleen?
          </div>
        )}

        <div className="illustration"></div>
        <div className="form-group">
          <Counter counter={counter} />
          {winCounter > 0 && <Counter counter={winCounter} />}
        </div>
        <div className="form-group">
          {hasNoPoints === false && (
            <div onClick={handleOnClick} className="button">
              <a style={{ color: "black", outline: 0 }}>Paina</a>
            </div>
          )}
          {hasNoPoints === true && (
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Pelaa uudelleen
              </button>
            </div>
          )}
        </div>
        <Scoreboard players={playerList} />
      </form>
    </div>
  );
};

export default GameForm;
