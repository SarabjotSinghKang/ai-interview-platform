import { Check } from "lucide-react";

function TagSelector({
  label,
  options = [],
  selectedValues = [],
  onChange,
  error,
}) {
  const toggleValue = (value) => {
    if (selectedValues.includes(value)) {
      onChange(
        selectedValues.filter(
          (selectedValue) => selectedValue !== value
        )
      );
      return;
    }

    onChange([...selectedValues, value]);
  };

  return (
    <div>
      {label && (
        <p className="mb-3 text-sm font-semibold text-slate-700">
          {label}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selectedValues.includes(
            option.value
          );

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleValue(option.value)}
              className={`
                inline-flex items-center gap-2 rounded-xl border px-4 py-2.5
                text-sm font-semibold transition
                ${
                  isSelected
                    ? "border-brand-500 bg-brand-50 text-brand-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }
              `}
            >
              {isSelected && (
                <Check className="size-4" />
              )}

              {option.label}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-3 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default TagSelector;