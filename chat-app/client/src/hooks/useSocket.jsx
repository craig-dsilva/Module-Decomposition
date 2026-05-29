import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (url) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on("history", (history) => {
      setMessages(history);
    });

    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("react", ({ index, type, value }) => {
      setMessages((prev) =>
        prev.map((msg, i) => (i === index ? { ...msg, [type]: value } : msg)),
      );
    });

    return () => socketRef.current.disconnect();
  }, [url]);

  const sendMessage = (text) => {
    const msg = { text, time: new Date().toISOString(), likes: 0, dislikes: 0 };
    socketRef.current.emit("message", msg);
    setMessages((prev) => [...prev, { ...msg, self: true }]);
  };

  const reactToMessage = (index, type) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, [type]: msg[type] + 1 } : msg,
      ),
    );
    socketRef.current.emit("react", { index, type });
  };

  return { messages, sendMessage, reactToMessage };
};

export default useSocket;
