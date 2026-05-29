import useSocket from "../hooks/useSocket";
import Chat from "../components/Chat/Chat";

const Socket = () => {
  const { messages, sendMessage, reactToMessage } = useSocket(
    "http://localhost:3000",
  );
  return (
    <Chat
      messages={messages}
      sendMessage={sendMessage}
      reactToMessage={reactToMessage}
    />
  );
};

export default Socket;
