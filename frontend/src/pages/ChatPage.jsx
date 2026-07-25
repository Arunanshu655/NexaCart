import { useParams } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow";

const ChatPage = () => {
  const { chatId } = useParams();

  return (
    <div className="chat-page">
      <ChatWindow chatId={chatId} />
    </div>
  );
};

export default ChatPage;