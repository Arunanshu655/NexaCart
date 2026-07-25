import "./MessageList.css";

const MessageList = ({ messages }) => {

  // Replace with your auth/user context later
  const currentUserId = localStorage.getItem("userId");

  return (
    <div className="message-list">

      {messages.map((message, index) => (

        <div
          key={index}
          className={
            message.sender.id === currentUserId
              ? "my-message"
              : "other-message"
          }
        >

          <h5>{message.sender.name}</h5>

          <p>{message.text}</p>

          <small>
            {new Date(message.createdAt).toLocaleTimeString()}
          </small>

        </div>

      ))}

    </div>
  );
};

export default MessageList;