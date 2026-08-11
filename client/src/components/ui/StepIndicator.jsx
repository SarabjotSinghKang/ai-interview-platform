import { Check } from "lucide-react";

function StepIndicator({
  steps = [],
  currentStep = 0,
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`
                    grid size-9 place-items-center rounded-full border
                    text-sm font-bold transition
                    ${
                      isCompleted
                        ? "border-brand-500 bg-brand-500 text-white"
                        : isCurrent
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-slate-200 bg-white text-slate-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="size-4" />
                  ) : (
                    index + 1
                  )}
                </span>

                <span
                  className={`
                    mt-2 hidden text-xs font-semibold sm:block
                    ${
                      isCurrent || isCompleted
                        ? "text-slate-700"
                        : "text-slate-400"
                    }
                  `}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    mx-3 h-px flex-1
                    ${
                      index < currentStep
                        ? "bg-brand-500"
                        : "bg-slate-200"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepIndicator;