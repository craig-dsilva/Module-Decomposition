import useSocket from "../hooks/useSocket";
import Chat from "../components/Chat/Chat";

const Socket = () => {
  const { messages, sendMessage } = useSocket("http://localhost:3000");
  return <Chat messages={messages} sendMessage={sendMessage} />;
};

export default Socket;
