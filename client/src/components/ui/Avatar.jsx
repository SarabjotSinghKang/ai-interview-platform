function Avatar({
  name = "",
  imageUrl = "",
  size = "md",
  className = "",
}) {
  const sizeClasses = {
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-14 text-base",
  };

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`
          rounded-full object-cover
          ${sizeClasses[size]}
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        grid place-items-center rounded-full
        bg-gradient-to-br from-brand-500 to-accent-500
        font-bold text-white
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={name}
    >
      {initials || "U"}
    </div>
  );
}

export default Avatar;