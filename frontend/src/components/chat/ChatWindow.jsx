import { MessageCircle } from "lucide-react";

const ChatWindow = () => {

  return (
    <section className="
      hidden
      min-h-[500px]
      flex-col
      bg-[#F5F5F7]
      lg:flex
    ">

      {/* Empty State */}
      <div className="
        flex
        flex-1
        items-center
        justify-center
        text-center
      ">

        <div>

          <div className="
            mx-auto
            flex h-16 w-16
            items-center justify-center
            rounded-full
            bg-white
            text-[var(--primary)]
            shadow-sm
          ">
            <MessageCircle size={30} />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Select a conversation
          </h2>

          <p className="
            mx-auto mt-2
            max-w-sm
            text-sm
            text-[var(--muted)]
          ">
            Choose a conversation from the left to start
            chatting.
          </p>

        </div>

      </div>

    </section>
  );
};

export default ChatWindow;