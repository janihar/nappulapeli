//Connection, fetch addresses

//Check if user exists
export const LOCALEXISTS = "http://localhost:8080/doesExists?userName=";
export const SERVEREXISTS =
  "https://vincgameserver.herokuapp.com/doesExists?userName=";
//For socket
export const LOCALSOCKET = "http://localhost:8080/";
export const SERVERSOCKET = "wss://vincgameserver.herokuapp.com/";
//How many players online
export const LOCALPLAYERSCOUNT = "http://localhost:8080/playersOnline";
export const SERVERPLAYERSCOUNT = "https://vincgameserver.herokuapp.com/playersOnline";
