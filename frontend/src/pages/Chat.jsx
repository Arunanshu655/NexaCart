import { useQuery } from "@apollo/client/react";
import { MessageCircle } from "lucide-react";

import { GET_MY_CHATS } from "../graphql/queries/chatQueries";
import { useAuth } from "../context/AuthContext";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import Skeleton from "../components/ui/Skeleton";

const Chat = () => {
  const { user } = useAuth();

  const {
    loading,
    error,
    data,
  } = useQuery(GET_MY_CHATS);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">

        <Skeleton className="h-[650px] w-full" />

        <Skeleton className="hidden h-[650px] w-full lg:block" />

      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[var(--danger)]">
          {error.message}
        </p>
      </div>
    );
  }

  const chats = data?.myChats || [];

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="
          flex h-11 w-11
          items-center justify-center
          rounded-full
          bg-blue-50
          text-[var(--primary)]
        ">
          <MessageCircle size={21} />
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Messages
          </h1>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Chat with sellers and other users.
          </p>
        </div>

      </div>

      {/* Chat Application */}
      <div className="
        grid
        grid-cols-1
        overflow-hidden
        rounded-[10px]
        border border-[var(--border)]
        bg-white
        shadow-sm
        lg:grid-cols-[320px_1fr]
        lg:h-[650px]
      ">

        <ChatSidebar
          chats={chats}
          currentUser={user}
        />

        <ChatWindow
          currentUser={user}
        />

      </div>

    </div>
  );
};

export default Chat;