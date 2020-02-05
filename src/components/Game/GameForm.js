import React, { useState, useEffect } from "react";

import Counter from "../../components/Game/Counter";
import Socket from "./Connection";
import Scoreboard from "./Scoreboard";
import WinMessage from "../Message/Game/WinMessage";
import LossMessage from "../Message/Game/LossMessage";
import { LOCALRESTARTGAME, SERVERRESTARTGAME } from "../../Connect";
import "../../styles/gameform.css";
import "../../styles/playbutton.css";
//Endpoint
let didWin = false;
const GameForm = () => {
  //Counter
  const [counter, setCounter] = useState(20); //Our game counter
  const [winCounter, setWinCounter] = useState(0); //How many points are needed for win
  const [socket, setSocket] = useState(); // Saving Socket
  const [winPoints, setWinPoints] = useState(0); //How many points player won
  const [hasNoPoints, setHasNoPoints] = useState(false); // If player has no points deny button press
  const [playerList, setPlayerList] = useState([]); //Saving other players who are ingame
  const [close, setClose] = useState(false); //Toggling win alert on and off, false represents off
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

  //If counter is updated, trigger this Effect
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
    if (counter === 0) {
      const data = await fetch(LOCALRESTARTGAME + getUSERNAME());
      const res = await data.json();
      setHasNoPoints(false);
      setCounter(res.points);
      setClose(true);
    }
  };

  return (
    <div className="login-clean">
      <form onSubmit={handleRestart}>
        <p className="username">{getUSERNAME()}</p>
        {winPoints > 0 && close === false && (
          <WinMessage winpoints={winPoints} onClick={() => setWinPoints(0)} />
        )}

        {hasNoPoints === true && <LossMessage />}

        <div className="illustration"></div>
        <div className="form-group">
          <a>Omat pisteet</a>
          <Counter counter={counter} />
          <a>Tarvittavat pisteet seuraavaan voittoon</a>
          {winCounter > 0 && <Counter counter={winCounter} />}
        </div>
        <div className="form-group">
          {hasNoPoints === false && (
            <div onClick={handleOnClick} className="button">
              <a
                style={{ color: "black"}}
                className="noselect"
              >
                Paina
              </a>
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
