import { useEffect, useRef, useState } from "react";

const useLongPoll = (url) => {
  const [messages, setMessages] = useState([]);
  const cursorRef = useRef(0);
  const activeRef = useRef(true);

  useEffect(() => {
    fetch(`${url}/poll/history`)
      .then((r) => r.json())
      .then((history) => {
        setMessages(history);
        cursorRef.current = history.length;
      });

    return () => {
      activeRef.current = false;
    };
  }, [url]);

  const sendMessage = async (text) => {
    const msg = { text, time: new Date().toISOString(), likes: 0, dislikes: 0 };
    setMessages((prev) => [...prev, { ...msg, self: true }]);
    await fetch(`${url}/poll/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });
  };

  const reactToMessage = async (index, type) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, [type]: msg[type] + 1 } : msg,
      ),
    );
    await fetch(`${url}/poll/message/${index}?type=${type}`, { method: "PATCH" });
  };

  return { messages, sendMessage, reactToMessage };
};

export default useLongPoll;
