import { MessageCircle, User } from "lucide-react";

const ChatSidebar = ({
  chats,
  currentUser,
}) => {

  return (
    <aside className="
      border-b
      border-[var(--border)]
      bg-[#FAFAFA]
      lg:border-b-0
      lg:border-r
    ">

      {/* Header */}
      <div className="
        border-b
        border-[var(--border)]
        px-5 py-4
      ">

        <h2 className="font-semibold">
          Conversations
        </h2>

        <p className="mt-1 text-xs text-[var(--muted)]">
          {chats.length} conversation
          {chats.length !== 1 ? "s" : ""}
        </p>

      </div>

      {/* Chats */}
      <div className="
        max-h-[250px]
        overflow-y-auto
        lg:max-h-[590px]
      ">

        {chats.length === 0 ? (

          <div className="px-5 py-12 text-center">

            <MessageCircle
              size={32}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm font-medium">
              No conversations
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Start a chat with a seller.
            </p>

          </div>

        ) : (

          chats.map((chat) => {

            const otherUser = chat.users?.find(
              (u) => u.id !== currentUser?.id
            );

            const lastMessage =
              chat.messages?.[chat.messages.length - 1];

            return (
              <button
                key={chat.id}
                className="
                  flex w-full
                  items-center gap-3
                  border-b border-[var(--border)]
                  px-5 py-4
                  text-left
                  transition-colors duration-200
                  hover:bg-white
                "
              >

                {/* Avatar */}
                <div className="
                  relative
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-white
                ">
                  <User size={19} />

                  <span className="
                    absolute
                    bottom-0
                    right-0
                    h-3
                    w-3
                    rounded-full
                    border-2
                    border-white
                    bg-[var(--success)]"
                  />
                </div>
                {/* info */}
                <div className=" min-w-0 flex-1 ">

                  <div className="flex items-center justify-between gap-2">

                    <p className="truncate text-sm font-semibold">
                      {otherUser?.name || "User"}
                    </p>

                  </div>

                  <p className="
                    mt-1
                    truncate
                    text-xs
                    text-[var(--muted)]
                  ">
                    {lastMessage?.text || "No messages yet"}
                  </p>

                </div>

              </button>
            );
          })

        )}

      </div>

    </aside>
  );
};

export default ChatSidebar;