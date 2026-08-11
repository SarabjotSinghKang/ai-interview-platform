import { Sparkles } from "lucide-react";
import { Link } from "react-router";

function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-3"
      aria-label="InterviewAI home"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/20">
        <Sparkles
          className="size-5 text-white"
          strokeWidth={2.2}
        />
      </span>

      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        Interview
        <span className="text-brand-500">AI</span>
      </span>
    </Link>
  );
}

export default Logo;