const Input = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">

      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        className={`
          w-full
          rounded-[10px]
          border
          border-[var(--border)]
          bg-white
          px-4
          py-3
          outline-none
          transition-all
          duration-200
          focus:border-[var(--primary)]
          focus:ring-2
          focus:ring-blue-200
          ${className}
        `}
        {...props}
      />

    </div>
  );
};

export default Input;