function Input({
  label,
  id,
  error,
  helperText,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          h-12 w-full rounded-xl border bg-slate-950/60 px-4
          text-sm text-white outline-none transition
          placeholder:text-slate-600
          ${
            error
              ? "border-rose-400/70 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10"
              : "border-white/10 focus:border-brand-400 focus:ring-4 focus:ring-brand-400/10"
          }
        `}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-rose-400">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;