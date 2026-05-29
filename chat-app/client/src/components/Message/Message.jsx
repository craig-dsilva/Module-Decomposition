import formatTime from "../../utils/formatTime";
import "./Message.css";

const Message = ({ message, messageTime, likes, dislikes }) => {
  const { date, time } = formatTime(messageTime);

  return (
    <div className="message">
      <p className="message-text">{message}</p>
      <div className="message-info">
        <p>{`${date} ${time}`}</p>
        <div className="message-like">
          <button className="like-button">&#128077;</button>
          <p>Likes: {likes}</p>
        </div>
        <div className="message-like">
          <button className="like-button">&#128078;</button>
          <p>Dislikes: {dislikes}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
