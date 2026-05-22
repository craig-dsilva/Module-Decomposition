import { io } from "socket.io-client";
import "./App.css";

const App = () => {
  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("message", (data) => console.log(data));

  return <></>;
};

export default App;
