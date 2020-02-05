//Connection queries

// Run server from this specific location
export const SERVER = "http://localhost:8080";
//If you want to use server from cloud use this https://vincgameserver.herokuapp.com
//instead of localhost address
export const SERVERSOCKET = "http://localhost:8080/";
//If you want to use serversocket from cloud
//use this wss://vincgameserver.herokuapp.com/
//instead of localhost address ;

//Check if user exists
export const LOCALEXISTS = "http://localhost:8080/doesexists?userName=";
export const SERVEREXISTS =
  "https://vincgameserver.herokuapp.com/doesexists?userName=";
//For socket
export const LOCALSOCKET = "http://localhost:8080/";
//export const SERVERSOCKET =
//How many players online
export const LOCALPLAYERSCOUNT = "http://localhost:8080/playersonline";
export const SERVERPLAYERSCOUNT =
  "https://vincgameserver.herokuapp.com/playersOnline";
//Restart game
export const LOCALRESTARTGAME = "http://localhost:8080/restartgame?userName=";
export const SERVERRESTARTGAME =
  "https://vincgameserver.herokuapp.com/restartgame?userName=";
//Logout
export const LOCALLOGOUT = "http://localhost:8080/logout?userName=";
export const SERVERLOGOUT =
  "http://vincgameserver.herokuapp.com/logout?userName=";
