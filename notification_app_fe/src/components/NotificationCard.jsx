const NotificationCard = ({ notification, onMarkRead }) => {
  return (
    <div className={`card ${notification.isRead ? "read" : "unread"}`}>
      <div className="card-top">
        <span className={`tag ${notification.type?.toLowerCase()}`}>
          {notification.type}
        </span>
        <small>{new Date(notification.createdAt).toLocaleString()}</small>
      </div>

      <p>{notification.message}</p>

      {!notification.isRead && (
        <button onClick={() => onMarkRead(notification._id)}>Mark as read</button>
      )}
    </div>
  );
};

export default NotificationCard;
