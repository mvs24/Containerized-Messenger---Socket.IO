import { Server, Socket } from "socket.io";

class SocketClient {
  _socket: null | Socket = null;

  get socket() {
    if (!this._socket) {
      throw new Error("Socket is not defined");
    }

    return this._socket;
  }

  connect(io: Server): Promise<Socket> {
    return new Promise((resolve) => {
      io.on("connection", (socket: Socket) => {
        console.log("Socket connected to ther server!");
        this._socket = socket;
        this._socket.join(socket.id);
        resolve(socket);
      });
    });
  }

  on(event: string) {
    return new Promise((resolve) => {
      this.socket.on(event, (data: any) => {
        console.log(event);
        resolve(data);
      });
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  join(room: string | string[]) {
    this.socket.join(room);
  }

  leave(room: string) {
    this.socket.leave(room);
  }
}

export default new SocketClient();
