import socketIOClient from "socket.io-client";

export default class Socket {
  constructor(name, counter) {
    console.log("Connection established");
    this.socket = socketIOClient("http://localhost:8080", {
      query: { name, counter },
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 10
    });
  }

  getSocket() {
    return this.socket;
  }
}
