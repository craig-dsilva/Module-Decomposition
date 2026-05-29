import { useState } from "react";
import Message from "../Message/Message";
import "./Chat.css";

const Chat = ({ messages, sendMessage, reactToMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="container">
      <ul className="messages">
        {messages.map((message, i) => (
          <Message
            key={i}
            i={i}
            index={message.index}
            message={message.text}
            messageTime={message.time}
            likes={message.likes}
            dislikes={message.dislikes}
            reactToMessage={reactToMessage}
          />
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

export default Chat;
