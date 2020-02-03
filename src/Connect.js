//Connection queries

//Check if user exists
export const LOCALEXISTS = "http://localhost:8080/doesexists?userName=";
export const SERVEREXISTS =
  "https://vincgameserver.herokuapp.com/doesexists?userName=";
//For socket
export const LOCALSOCKET = "http://localhost:8080/";
export const SERVERSOCKET = "wss://vincgameserver.herokuapp.com/";
//How many players online
export const LOCALPLAYERSCOUNT = "http://localhost:8080/playersonline";
export const SERVERPLAYERSCOUNT =
  "https://vincgameserver.herokuapp.com/playersOnline";
//Restart game
export const LOCALRESTARTGAME = "http://localhost:8080/restartgame?userName=";
export const SERVERRESTARTGAME =
  "https://vincgameserver.herokuapp.com/restartgame?userName=";
