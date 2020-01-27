const express = require("express");
const { createServer } = require("http");
const WebSocket = require("ws");

const app = express();
app.use(express.json({ extended: false }));
app.use("/game", require("./routes/game"));

//Server might not run in 8080 so process.env.PORT is must
const PORT = process.env.PORT || 8080;
const server = createServer(app);
server.listen(PORT, () => console.info(`Server running on port: ${PORT}`));

const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on("connection", webSocket => {
  console.info("Total connected clients:", webSocketServer.clients.size);

  app.locals.clients = webSocketServer.clients;
});
