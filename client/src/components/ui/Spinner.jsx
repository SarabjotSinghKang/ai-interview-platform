import { LoaderCircle } from "lucide-react";

function Spinner({
  size = "md",
  className = "",
}) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-6",
    lg: "size-10",
  };

  return (
    <LoaderCircle
      className={`
        animate-spin text-brand-500
        ${sizeClasses[size]}
        ${className}
      `}
    />
  );
}

export default Spinner;