const Button = ({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",

    outline:
      "border border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]",

    ghost:
      "bg-transparent text-[var(--text)] hover:bg-gray-100",

    danger:
      "bg-[var(--danger)] text-white hover:opacity-90"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;