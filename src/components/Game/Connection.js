import socketIOClient from "socket.io-client";
import { LOCALSOCKET, SERVERSOCKET } from "../../Connect";

export default class Socket {
  constructor(name, counter) {
    console.log("Connection established");
    this.socket = socketIOClient(SERVERSOCKET, {
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
