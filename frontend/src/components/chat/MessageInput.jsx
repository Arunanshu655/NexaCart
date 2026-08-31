import { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({
  onSend,
  disabled = false,
}) => {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = text.trim();

    if (!message || disabled) return;

    onSend(message);

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex items-center gap-3
        border-t border-[var(--border)]
        bg-white
        p-4
      "
    >

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="
          flex-1
          rounded-full
          border border-[var(--border)]
          bg-[var(--background)]
          px-5 py-3
          text-sm
          outline-none
          transition-all duration-200
          focus:border-[var(--primary)]
          focus:ring-2
          focus:ring-blue-100
          disabled:opacity-50
        "
      />

      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="
          flex h-11 w-11
          shrink-0
          items-center justify-center
          rounded-full
          bg-[var(--primary)]
          text-white
          transition-all duration-200
          hover:bg-[var(--primary-hover)]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Send size={18} />
      </button>

    </form>
  );
};

export default MessageInput;