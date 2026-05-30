import useSocket from "../hooks/useSocket";
import Chat from "../components/Chat/Chat";

const Socket = () => {
  const { messages, sendMessage, reactToMessage } = useSocket(
    "https://craig-dsilva-chat-app-server.hosting.codeyourfuture.io/",
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
