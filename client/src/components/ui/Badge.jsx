const variantClasses = {
  default: "bg-slate-100 text-slate-700",
  primary: "bg-brand-50 text-brand-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
  dark: "bg-slate-900 text-white",
};

function Badge({
  children,
  variant = "default",
  className = "",
}) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full
        px-3 py-1 text-xs font-semibold
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;