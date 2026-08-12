const Card = ({
  children,
  className = "",
  hover = true
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-[10px]
        shadow-sm
        border
        border-[var(--border)]
        p-6
        transition-all
        duration-200
        ${
          hover
            ? "hover:-translate-y-1 hover:shadow-lg"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;