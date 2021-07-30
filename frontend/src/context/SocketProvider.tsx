import React, { ReactElement, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket | null = null;

export const SocketContext = React.createContext<{
  socket: Socket | null;
}>({
  socket,
});

interface Props {
  children: ReactElement;
}

const SocketProvider = (props: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("/");
    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
