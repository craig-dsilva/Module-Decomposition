import usePoll from "../hooks/usePoll";
import Chat from "../components/Chat/Chat";

const Poll = () => {
  const { messages, sendMessage, reactToMessage } = usePoll(
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

export default Poll;
