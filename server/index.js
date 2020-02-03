var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server, {
  // below are engine.IO options
  pingInterval: 25000,
  pingTimeout: 60000
});
const PORT = process.env.PORT || 8080;
var cors = require("cors");
server.listen(PORT);

let serverCounter = 0;
let winCount = 10;
const players = new Map();

app.use(cors());

app.get("/", (req, res) => {
  res.send("WORKING");
});

//Check if username exists
app.get("/doesExists", (req, res) => {
  if (players.has(req.query.userName)) {
    res.status(401);
    res.send("Bad Username");
  } else {
    res.status(200);
    res.send("Good Username");
  }
});
//How many players are playing the game
app.get("/playersOnline", (req, res) => {
  res.status(200);
  res.send({ online: players.size.toString() });
});
//Websocket which handles communication ingame
io.on("connection", socket => {
  checkUser(socket.handshake.query.name, socket.handshake.query.counter);
  //Getting username, points and creating new player
  console.log("NEW PLAYER: ", socket.id);
  console.log("Pelaajat: ", players);
  socket.on("game", data => {
    socket.emit("serverpoints");
    //Check points
    let point = checkPoints();
    point = point - 1;
    //Set points for specific user
    players.set(
      socket.handshake.query.name,
      parseInt(players.get(socket.handshake.query.name)) + point
    );
    point = point + 1;
    //Sending only points to one client not them all, therefore socket.emit not io.emit
    socket.emit("number", {
      points: point,
      playerPoints: parseInt(players.get(socket.handshake.query.name))
    });
  });
  //Socket which sends data to client to tell for how many points are needed to win something
  socket.on("serverpoints", () => {
    io.emit("points", {win: nextWin(), playerlist: Array.from(players)});
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECTED: ", socket.id);
  });
});

/**
 * Calculates how many points are given to player,
 * if amount is matching with rules
 * we send specific amount of points
 */
const checkPoints = () => {
  serverCounter++;
  if (serverCounter !== 0) {
    if (serverCounter % 500 === 0) {
      //Every 500
      //Send reward to player (250 points)
      serverCounter = 0;
      return 250;
    } else if (serverCounter % 100 === 0) {
      //Every 100
      //Send reward to player (40 points)
      return 40;
    } else if (serverCounter % 10 === 0) {
      //Every 10
      //Send reward to player (5 points)
      return 5;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

const nextWin = () => {
  if (winCount === 0) {
    winCount = 10;
  }
  return winCount - (serverCounter % 10);
};

/**
 * Check if user aldready exists. We need this if user disconnects. We store user
 * in Map and check if user already exists.
 * @param {string} userName
 * @param {integer} points
 */
const checkUser = (userName, points) => {
  //User exists
  if (!players.has(userName)) {
    players.set(userName, points);
  }
};
