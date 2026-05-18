import { io } from "socket.io-client";
import "./App.css";

const App = () => {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  return <></>;
};

export default App;
