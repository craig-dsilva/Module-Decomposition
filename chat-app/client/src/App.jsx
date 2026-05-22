import { useState } from "react";
import useSocket from "./hooks/useSocket";
import "./App.css";

export default function App() {
  const { messages, sendMessage } = useSocket("http://localhost:3000");
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
          <li className="message" key={i}>
            {message.text}
          </li>
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
}
