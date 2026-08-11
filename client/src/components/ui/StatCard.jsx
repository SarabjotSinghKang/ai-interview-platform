import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import Card from "./Card.jsx";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendDirection = "up",
}) {
  const isPositive = trendDirection === "up";

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -right-8 -top-8 size-28 rounded-full bg-brand-50" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        {Icon && (
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50">
            <Icon className="size-5 text-brand-600" />
          </span>
        )}
      </div>

      <div className="relative mt-5 flex items-center gap-2 text-sm">
        {trend && (
          <span
            className={`
              inline-flex items-center gap-1 font-semibold
              ${
                isPositive
                  ? "text-emerald-600"
                  : "text-rose-600"
              }
            `}
          >
            {isPositive ? (
              <ArrowUpRight className="size-4" />
            ) : (
              <ArrowDownRight className="size-4" />
            )}

            {trend}
          </span>
        )}

        {description && (
          <span className="text-slate-500">
            {description}
          </span>
        )}
      </div>
    </Card>
  );
}

export default StatCard;