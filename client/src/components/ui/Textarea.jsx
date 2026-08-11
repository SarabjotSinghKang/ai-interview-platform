function Textarea({
  label,
  id,
  error,
  helperText,
  className = "",
  rows = 5,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        rows={rows}
        className={`
          w-full resize-none rounded-xl border bg-white px-4 py-3
          text-sm leading-6 text-slate-900 outline-none transition
          placeholder:text-slate-400
          ${
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              : "border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
          }
        `}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-rose-600">
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

export default Textarea;