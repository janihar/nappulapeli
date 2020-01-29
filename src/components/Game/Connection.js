import socketIOClient from "socket.io-client";

export default class Socket {
  constructor(name, counter) {
    this.socket = socketIOClient("http://localhost:8080", {
      query: { name, counter }
    });
  }
}
