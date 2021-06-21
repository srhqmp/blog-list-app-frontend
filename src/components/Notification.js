const Notification = ({ message, classification }) => {
  return <div className={classification}>{message}</div>;
};

export default Notification;
