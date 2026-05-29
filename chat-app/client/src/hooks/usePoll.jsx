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

    const poll = async () => {
      while (activeRef.current) {
        try {
          const res = await fetch(`${url}/poll?since=${cursorRef.current}`);
          const data = await res.json();

          if (data.messages.length > 0) {
            data.messages.forEach((msg) => {
              if (msg.index !== undefined) {
                setMessages((prev) =>
                  prev.map((m, i) => (i === msg.index ? { ...m, ...msg } : m)),
                );
              } else {
                cursorRef.current = data.cursor;
                setMessages((prev) => [...prev, msg]);
              }
            });
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
    await fetch(`${url}/poll/message/${index}/${type}`, { method: "PATCH" });
  };

  return { messages, sendMessage, reactToMessage };
};

export default useLongPoll;
