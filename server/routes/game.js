var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const PORT = process.env.PORT || 8080

server.listen(PORT);


app.get("/", function(req, res) {
  res.sendFile("TOIMII");
});

io.on("connection", function(socket) {
  
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
  });
});
