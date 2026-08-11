import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  MessageSquareText,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";

import Container from "../components/common/Container.jsx";
import PublicNavbar from "../components/layout/PublicNavbar.jsx";
import Button from "../components/ui/Button.jsx";

const trustedTechnologies = [
  "React",
  "Node.js",
  "MongoDB",
  "JavaScript",
  "Express",
];

const performanceItems = [
  {
    label: "Technical clarity",
    score: 88,
  },
  {
    label: "Answer structure",
    score: 82,
  },
  {
    label: "Communication",
    score: 91,
  },
];

function HeroPreview() {
  return (
    <div className="relative mx-auto max-w-xl lg:mx-0">
      <div className="absolute -inset-8 rounded-[3rem] bg-brand-500/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="rounded-[1.6rem] border border-white/10 bg-slate-950 p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-sm font-semibold text-white">
                Frontend Developer Interview
              </p>

              <p className="mt-1 text-xs text-slate-500">
                React · JavaScript · Junior level
              </p>
            </div>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Completed
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[140px_1fr]">
            <div className="grid place-items-center rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="relative grid size-24 place-items-center rounded-full bg-[conic-gradient(#6366f1_0deg,#6366f1_317deg,#1e293b_317deg)]">
                <div className="grid size-20 place-items-center rounded-full bg-slate-950">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      8.8
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      Score
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              {performanceItems.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-400">
                      {item.label}
                    </span>

                    <span className="font-semibold text-white">
                      {item.score}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-accent-400" />

              <p className="text-sm font-semibold text-white">
                Interview feedback
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Strong understanding of React fundamentals",
                "Clear explanations with relevant examples",
                "Add more detail when discussing performance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-400"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/15">
                    <Check className="size-3 text-brand-300" />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl sm:block">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-400/10">
            <TrendingUp className="size-5 text-emerald-300" />
          </span>

          <div>
            <p className="text-xs text-slate-500">
              Progress this month
            </p>

            <p className="mt-0.5 text-sm font-bold text-white">
              +24% improvement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PublicNavbar />

      <main>
        <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40 lg:min-h-screen lg:pb-32">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,0.14),transparent_28%)]" />

          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/10 px-4 py-2 text-sm font-semibold text-brand-200">
                  <Sparkles className="size-4" />
                  Smarter interview preparation
                </div>

                <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                  Turn every interview into
                  <span className="block bg-gradient-to-r from-brand-300 via-white to-accent-300 bg-clip-text text-transparent">
                    your competitive edge.
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                  Practise role-specific interviews,
                  structure stronger answers, and receive
                  actionable feedback that helps you improve
                  after every session.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link to="/register">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Start practising free
                      <ArrowRight className="size-5" />
                    </Button>
                  </Link>

                  <a href="#how-it-works">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Play className="size-5" />
                      See how it works
                    </Button>
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                  {[
                    "Role-specific questions",
                    "Structured feedback",
                    "Progress tracking",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <Check className="size-4 text-emerald-400" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-12 border-t border-white/10 pt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                    Prepare across your technology stack
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
                    {trustedTechnologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          className="text-sm font-semibold text-slate-400"
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <HeroPreview />
            </div>
          </Container>
        </section>

        <section
          id="features"
          className="border-y border-white/10 bg-slate-900/40 py-24"
        >
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">
                Built for meaningful improvement
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                More than a list of interview questions
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-400">
                Follow a structured preparation workflow
                designed to improve both technical knowledge
                and interview communication.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: Target,
                  title: "Role-based sessions",
                  description:
                    "Create interviews based on your target role, experience level, difficulty, and technology stack.",
                },
                {
                  icon: BrainCircuit,
                  title: "Smart question flow",
                  description:
                    "Practise with relevant technical and behavioural questions organised into a focused session.",
                },
                {
                  icon: MessageSquareText,
                  title: "Actionable feedback",
                  description:
                    "Understand what was strong, what was missing, and how each answer can be improved.",
                },
                {
                  icon: BarChart3,
                  title: "Progress analytics",
                  description:
                    "Track completed interviews, scores, strengths, and areas requiring more preparation.",
                },
              ].map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-400/30 hover:bg-white/[0.055]"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl border border-brand-400/20 bg-brand-400/10">
                      <Icon className="size-5 text-brand-300" />
                    </span>

                    <h3 className="mt-6 text-lg font-bold">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section
          id="how-it-works"
          className="py-24 sm:py-32"
        >
          <Container>
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-400">
                  How it works
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  A focused process from preparation to
                  improvement.
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-400">
                  Each session is designed to simulate the
                  thinking and communication expected during
                  real interviews.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    number: "01",
                    icon: Target,
                    title: "Configure your interview",
                    text: "Choose the role, experience level, difficulty, interview type, and technologies you want to practise.",
                  },
                  {
                    number: "02",
                    icon: MessageSquareText,
                    title: "Answer one question at a time",
                    text: "Work through a structured interview session while your progress is saved automatically.",
                  },
                  {
                    number: "03",
                    icon: BrainCircuit,
                    title: "Receive detailed evaluation",
                    text: "Review answer scores, ideal responses, strengths, weaknesses, and improvement suggestions.",
                  },
                  {
                    number: "04",
                    icon: TrendingUp,
                    title: "Track your progress",
                    text: "Use your dashboard and interview history to identify patterns and improve over time.",
                  },
                ].map((step) => {
                  const Icon = step.icon;

                  return (
                    <article
                      key={step.number}
                      className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-[70px_1fr] sm:p-7"
                    >
                      <div className="flex items-center gap-3 sm:block">
                        <span className="text-sm font-bold text-brand-300">
                          {step.number}
                        </span>

                        <span className="mt-0 sm:mt-5 grid size-11 place-items-center rounded-2xl bg-white/5">
                          <Icon className="size-5 text-white" />
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold">
                          {step.title}
                        </h3>

                        <p className="mt-3 leading-7 text-slate-400">
                          {step.text}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        <section
          id="benefits"
          className="pb-24 sm:pb-32"
        >
          <Container>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-400/20 bg-gradient-to-br from-brand-600/25 via-slate-900 to-accent-600/15 px-6 py-14 text-center shadow-glow sm:px-12 sm:py-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_35%)]" />

              <div className="relative mx-auto max-w-3xl">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/10">
                  <ShieldCheck className="size-6 text-brand-200" />
                </span>

                <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-5xl">
                  Prepare with purpose. Interview with
                  confidence.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Build stronger answers and enter your next
                  technical interview with a clear understanding
                  of your strengths and preparation gaps.
                </p>

                <Link
                  to="/register"
                  className="mt-8 inline-block"
                >
                  <Button size="lg">
                    Create your free account
                    <ArrowRight className="size-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <Container className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>
            © 2026 InterviewAI. Built for better
            interview preparation.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <Link
              to="/login"
              className="transition hover:text-white"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="transition hover:text-white"
            >
              Register
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default HomePage;