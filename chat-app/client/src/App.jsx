import { useState } from "react";
import useSocket from "./hooks/useSocket";
import Message from "./components/Message";
import "./App.css";

const App = () => {
  const { messages, sendMessage } = useSocket(
    "https://craig-dsilva-chat-app-server.hosting.codeyourfuture.io/",
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="container">
      <ul className="messages">
        {messages.map((message) => (
          <Message message={message.text} messageTime={message.time} />
        ))}
      </ul>
      <div className="chat-box">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
