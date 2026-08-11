function Select({
  label,
  id,
  error,
  options = [],
  placeholder = "Select an option",
  className = "",
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

      <select
        id={id}
        className={`
          h-12 w-full rounded-xl border bg-white px-4
          text-sm text-slate-900 outline-none transition
          ${
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
              : "border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
          }
        `}
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;