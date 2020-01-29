var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const Player = require("./player/player");
const Players = require("./player/players.js");
const PORT = process.env.PORT || 8080;
server.listen(PORT);

let serverCounter = 0;
const players = new Players([]);
app.get("/", function(req, res) {
  res.send("TOIMII");
});

io.on("connection", function(socket) {
  //Gettin username and creating new player
  console.log(socket.handshake.query);
  const player = new Player(
    socket.handshake.query.name,
    socket.handshake.points
  );
  console.log(
    "Uusi pelaaja : ",
    player.getUsername(),
    " Pelaajan pisteet : ",
    player.getPoints()
  );
  players.addPlayer(player);
  console.log("Pelaajat: ", players.getPlayer());
  socket.on("game", data => {
    io.emit("number", checkPoints());
  });
});

const checkPoints = () => {
  serverCounter++;
  console.log("Pisteet", serverCounter);
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
