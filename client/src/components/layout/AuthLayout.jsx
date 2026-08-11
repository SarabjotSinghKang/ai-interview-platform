import {
  BarChart3,
  CheckCircle2,
  MessageSquareText,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router";

import Logo from "../common/Logo.jsx";

const benefits = [
  {
    icon: Target,
    text: "Role-specific interview practice",
  },
  {
    icon: MessageSquareText,
    text: "Structured answer feedback",
  },
  {
    icon: BarChart3,
    text: "Track improvement over time",
  },
];

function AuthLayout({
  children,
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.3),transparent_36%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.18),transparent_30%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">
            <Logo light />

            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/10 px-4 py-2 text-sm font-semibold text-brand-200">
                <Sparkles className="size-4" />
                Prepare with confidence
              </div>

              <h2 className="mt-7 text-5xl font-bold leading-tight tracking-[-0.04em]">
                Build stronger answers before the real interview.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Practise focused interview sessions, improve
                technical communication, and track your progress
                from one session to the next.
              </p>

              <div className="mt-10 space-y-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div
                      key={benefit.text}
                      className="flex items-center gap-4"
                    >
                      <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="size-5 text-brand-300" />
                      </span>

                      <span className="font-medium text-slate-200">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <CheckCircle2 className="size-4 text-emerald-400" />
              Your interview progress is saved securely.
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Logo light />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
                  InterviewAI
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {title}
                </h1>

                <p className="mt-3 leading-7 text-slate-400">
                  {description}
                </p>
              </div>

              <div className="mt-8">
                {children}
              </div>

              <p className="mt-8 text-center text-sm text-slate-500">
                {footerText}{" "}
                <Link
                  to={footerLinkTo}
                  className="font-semibold text-brand-300 transition hover:text-brand-200"
                >
                  {footerLinkText}
                </Link>
              </p>
            </div>

            <Link
              to="/"
              className="mt-6 block text-center text-sm font-medium text-slate-500 transition hover:text-white"
            >
              ← Back to home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;