import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";

import socket from "../../socket/socket";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { GET_CHAT } from "../../graphql/queries/chatQueries";

const ChatWindow = ({ chatId }) => {

  const [messages, setMessages] = useState([]);

  const { loading, error, data } = useQuery(GET_CHAT, {
    variables: {
      chatId
    }
  });

  // Load old messages from GraphQL
  useEffect(() => {

    if (data?.chat) {
      setMessages(data.chat.messages);
    }

  }, [data]);

  // Join socket room
  useEffect(() => {

    socket.emit("join_chat", chatId);

    socket.on("receive_message", (message) => {

      setMessages(prev => [...prev, message]);

    });

    return () => {

      socket.off("receive_message");

    };

  }, [chatId]);

  if (loading) return <h3>Loading...</h3>;

  if (error) return <h3>{error.message}</h3>;

  return (

    <div className="chat-window">

      <MessageList
        messages={messages}
      />

      <MessageInput
        chatId={chatId}
        setMessages={setMessages}
      />

    </div>

  );

};

export default ChatWindow;