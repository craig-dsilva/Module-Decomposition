import usePoll from "../hooks/usePoll";
import Chat from "../components/Chat/Chat";

const Poll = () => {
  const { messages, sendMessage, reactToMessage } = usePoll(
    "https://craig-dsilva-chat-app-server.hosting.codeyourfuture.io",
  );
  return (
    <Chat
      messages={messages}
      sendMessage={sendMessage}
      reactToMessage={reactToMessage}
    />
  );
};

export default Poll;
