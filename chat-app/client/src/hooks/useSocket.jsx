import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (url) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on("history", (history) => {
      setMessages(history.map((message) => ({ ...message })));
    });

    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socketRef.current.disconnect();
  }, [url]);

  const sendMessage = (text) => {
    const message = {
      text,
      time: new Date().toISOString(),
    };
    socketRef.current.emit("message", message);
    setMessages((prev) => [...prev, { ...message }]);
  };

  return { messages, sendMessage };
};

export default useSocket;
