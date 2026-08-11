import { LoaderCircle } from "lucide-react";

const variantClasses = {
  primary:
    "bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-400 focus-visible:ring-brand-400",

  secondary:
    "border border-slate-700 bg-slate-900/70 text-white hover:border-slate-600 hover:bg-slate-800 focus-visible:ring-slate-500",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-brand-400",

  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-400",
};

const sizeClasses = {
  sm: "h-10 rounded-xl px-4 text-sm",
  md: "h-12 rounded-xl px-5 text-sm",
  lg: "h-14 rounded-2xl px-7 text-base",
};

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold transition duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-60
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <LoaderCircle className="size-4 animate-spin" />
      )}

      {children}
    </button>
  );
}

export default Button;