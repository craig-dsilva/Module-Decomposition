import { useEffect, useRef, useState } from "react";

const usePoll = (url) => {
  const [messages, setMessages] = useState([]);
  const cursorRef = useRef(0);
  const activeRef = useRef(true);

  useEffect(() => {
    const poll = async () => {
      while (activeRef.current) {
        try {
          const res = await fetch(`${url}/poll?since=${cursorRef.current}`);
          const data = await res.json();

          if (data.messages.length > 0) {
            cursorRef.current = data.cursor;
            setMessages((prev) => [...prev, ...data.messages]);
          }
        } catch {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    };

    poll();
    return () => {
      activeRef.current = false;
    };
  }, [url]);

  const sendMessage = async (text) => {
    const message = { text, time: new Date().toISOString() };
    setMessages((prev) => [...prev, { ...message }]);

    await fetch(`${url}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  };

  return { messages, sendMessage };
};

export default usePoll;
