function Card({
  children,
  className = "",
  padding = "default",
}) {
  const paddingClasses = {
    none: "",
    small: "p-4",
    default: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`
        rounded-3xl border border-slate-200
        bg-white shadow-sm
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;