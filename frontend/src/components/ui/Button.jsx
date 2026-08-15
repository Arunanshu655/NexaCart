const Button = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl active:shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizes = {
    small: "px-8 py-4 text-xs",
    medium: "px-14 py-5 text-sm",
    large: "px-16 py-6 text-base",
    xl: "px-20 py-7 text-lg"
  };

  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] focus:ring-[var(--primary)]/20",

    outline:
      "border-2 border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-blue-50 focus:ring-[var(--primary)]/20",

    ghost:
      "bg-transparent text-[var(--text)] hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300/20",

    danger:
      "bg-[var(--danger)] text-white hover:opacity-90 focus:ring-[var(--danger)]/20"
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;