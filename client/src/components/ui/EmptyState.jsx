import { Inbox } from "lucide-react";

import Button from "./Button.jsx";

function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-brand-50">
        <Icon className="size-7 text-brand-600" />
      </span>

      <h3 className="mt-5 text-lg font-bold text-slate-950">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {actionLabel && (
        <Button
          className="mt-6"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;