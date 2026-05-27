import formatTime from "../utils/formatTime";

const Message = ({ message, messageTime }) => {
  const { date, time } = formatTime(messageTime);

  return (
    <div className="message">
      <p className="message-text">{message}</p>
      <p className="message-time">{`${date} ${time}`}</p>
    </div>
  );
};

export default Message;
