const formatTime = (messageTime) => {
  const dt = new Date(messageTime);
  const date = new Intl.DateTimeFormat("en-GB").format(new Date(dt));
  const time = new Date(messageTime).toTimeString().split(" ")[0];
  return { date, time };
};

export default formatTime;
