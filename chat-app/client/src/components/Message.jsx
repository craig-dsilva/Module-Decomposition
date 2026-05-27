const Message = ({ message, time }) => {
  return (
    <div className="message">
      <p className="message-text">{message}</p>
      <p className="message-time">{time}</p>
    </div>
  );
};

export default Message;
