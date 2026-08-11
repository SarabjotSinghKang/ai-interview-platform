import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Lightbulb,
  LoaderCircle,
  MessageSquareText,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  Link,
  useParams,
} from "react-router";

import {
  getInterviewResult,
} from "../services/interviewService.js";


function getScoreLabel(score) {
  if (score >= 9) {
    return "Excellent";
  }

  if (score >= 8) {
    return "Very strong";
  }

  if (score >= 7) {
    return "Good";
  }

  if (score >= 5) {
    return "Needs improvement";
  }

  return "Keep practicing";
}


function getScorePercentage(score) {
  return Math.min(
    Math.max((Number(score) / 10) * 100, 0),
    100
  );
}


function formatDate(date) {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}


function formatValue(value) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return [value];
  }

  return null;
}


function FeedbackList({
  title,
  items,
  icon: Icon,
  iconClass,
}) {
  const values = formatValue(items);

  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`grid size-8 place-items-center rounded-lg ${iconClass}`}
        >
          <Icon className="size-4" />
        </span>

        <h4 className="text-sm font-bold text-slate-200">
          {title}
        </h4>
      </div>

      <ul className="space-y-2">
        {values.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 text-sm leading-6 text-slate-400"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-500" />

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


function ScoreRing({ score }) {
  const percentage =
    getScorePercentage(score);

  return (
    <div className="relative grid size-44 place-items-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            rgb(99 102 241) ${percentage}%,
            rgb(30 41 59) ${percentage}%
          )`,
        }}
      />

      <div className="absolute inset-[9px] rounded-full bg-slate-950" />

      <div className="relative text-center">
        <p className="text-4xl font-black tracking-tight text-white">
          {Number(score || 0).toFixed(1)}
        </p>

        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
          / 10
        </p>
      </div>
    </div>
  );
}


function InterviewResultPage() {
  const { id } = useParams();

  const [result, setResult] = useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [openQuestion, setOpenQuestion] =
    useState(0);


  useEffect(() => {
    const loadResult = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data =
          await getInterviewResult(id);

        setResult(data.result);
      } catch (error) {
        console.error(
          "Get interview result error:",
          error
        );

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load your interview result."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadResult();
    }
  }, [id]);


  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="size-9 animate-spin text-brand-400" />

          <p className="text-sm font-medium text-slate-400">
            Preparing your interview results...
          </p>
        </div>
      </div>
    );
  }


  if (errorMessage || !result) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 px-5">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose-500/10">
            <AlertCircle className="size-7 text-rose-400" />
          </span>

          <h1 className="mt-5 text-xl font-bold text-white">
            Unable to load results
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {errorMessage ||
              "The interview result could not be found."}
          </p>

          <Link
            to="/dashboard"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }


  const score = Number(
    result.overallScore || 0
  );

  const feedback =
    result.overallFeedback || {};

  const strengths =
    feedback.strengths || [];

  const weaknesses =
    feedback.weaknesses ||
    feedback.areasForImprovement ||
    [];

  const suggestions =
    feedback.suggestions ||
    feedback.recommendations ||
    feedback.recommendedTopics ||
    [];


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background effects */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 size-[500px] rounded-full bg-brand-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 size-[400px] rounded-full bg-cyan-500/5 blur-[130px]" />
      </div>


      {/* Header */}

      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            <span className="grid size-9 place-items-center rounded-xl border border-white/10">
              <ArrowLeft className="size-4" />
            </span>

            Back to dashboard
          </Link>


          <div className="hidden items-center gap-2 text-xs font-semibold text-slate-500 sm:flex">
            <CheckCircle2 className="size-4 text-emerald-400" />

            Interview completed
          </div>

        </div>
      </header>


      <main className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

        {/* Hero */}

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-2xl shadow-black/20">

          <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">

            <div className="absolute right-0 top-0 size-80 rounded-full bg-brand-500/10 blur-[100px]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-emerald-300">
                  <CheckCircle2 className="size-3.5" />

                  Interview completed
                </div>


                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  Here's how you performed.
                </h1>


                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Your AI-powered interview evaluation
                  is ready. Review your performance,
                  understand where you did well, and see
                  exactly what you can improve.
                </p>


                <div className="mt-7 flex flex-wrap gap-3">

                  <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300">
                    {result.jobRole}
                  </span>

                  <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold capitalize text-slate-300">
                    {result.difficulty}
                  </span>

                  <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300">
                    {result.questions.length} questions
                  </span>

                </div>

              </div>


              {/* Score */}

              <div className="flex flex-col items-center">

                <ScoreRing score={score} />

                <div className="mt-5 text-center">

                  <p className="text-lg font-bold text-white">
                    {getScoreLabel(score)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Overall performance
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* Stats */}

        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">

              <span className="grid size-10 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
                <Target className="size-5" />
              </span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Score
                </p>

                <p className="mt-1 text-xl font-bold">
                  {score.toFixed(1)} / 10
                </p>
              </div>

            </div>
          </div>


          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">

              <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-300">
                <MessageSquareText className="size-5" />
              </span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Questions
                </p>

                <p className="mt-1 text-xl font-bold">
                  {result.questions.length}
                </p>
              </div>

            </div>
          </div>


          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">

              <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300">
                <Clock3 className="size-5" />
              </span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Completed
                </p>

                <p className="mt-1 text-xl font-bold">
                  {formatDate(
                    result.completedAt
                  )}
                </p>
              </div>

            </div>
          </div>

        </section>


        {/* AI feedback */}

        <section className="mt-10">

          <div className="mb-5 flex items-end justify-between gap-4">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
                AI analysis
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Your performance breakdown
              </h2>
            </div>

          </div>


          {/* Overall feedback */}

          <div className="rounded-3xl border border-brand-400/20 bg-gradient-to-br from-brand-500/10 to-transparent p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                <Sparkles className="size-5" />
              </span>

              <div className="min-w-0">

                <h3 className="text-lg font-bold">
                  Overall AI feedback
                </h3>

                {typeof feedback === "string" ? (
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feedback}
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {feedback.summary ||
                      feedback.overview ||
                      feedback.message ||
                      "Your interview has been evaluated. Review the question-by-question feedback below to understand your performance."}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* Feedback cards */}

          <div className="mt-5 grid gap-5 lg:grid-cols-3">

            <div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/[0.04] p-6">

              <FeedbackList
                title="What you did well"
                items={strengths}
                icon={CheckCircle2}
                iconClass="bg-emerald-400/10 text-emerald-400"
              />

            </div>


            <div className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.04] p-6">

              <FeedbackList
                title="Areas to improve"
                items={weaknesses}
                icon={TrendingUp}
                iconClass="bg-amber-400/10 text-amber-400"
              />

            </div>


            <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/[0.04] p-6">

              <FeedbackList
                title="Recommended next steps"
                items={suggestions}
                icon={Lightbulb}
                iconClass="bg-cyan-400/10 text-cyan-400"
              />

            </div>

          </div>

        </section>


        {/* Question breakdown */}

        <section className="mt-12">

          <div className="mb-6">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
              Question analysis
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Review every answer
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              See how the AI evaluated each of your
              answers and where you can improve.
            </p>

          </div>


          <div className="space-y-4">

            {result.questions.map(
              (question, index) => {

                const isOpen =
                  openQuestion === index;

                const questionScore =
                  Number(question.score || 0);

                return (
                  <div
                    key={question.id}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
                  >

                    {/* Question header */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion(
                          isOpen ? -1 : index
                        )
                      }
                      className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-white/[0.03] sm:px-7"
                    >

                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-sm font-bold text-slate-300">
                        {index + 1}
                      </span>


                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                            {question.category}
                          </span>

                          <span className="text-xs text-slate-600">
                            •
                          </span>

                          <span className="text-xs capitalize text-slate-500">
                            {question.difficulty}
                          </span>

                        </div>

                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-200">
                          {question.questionText}
                        </p>

                      </div>


                      <div className="hidden text-right sm:block">

                        <p className="text-lg font-black text-white">
                          {questionScore.toFixed(1)}
                        </p>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          / 10
                        </p>

                      </div>


                      <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 text-slate-500">
                        {isOpen ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </span>

                    </button>


                    {/* Question details */}

                    {isOpen && (
                      <div className="border-t border-white/10 px-5 py-6 sm:px-7">

                        {/* Score */}

                        <div className="mb-7 flex items-center justify-between gap-5">

                          <div className="flex-1">

                            <div className="mb-2 flex justify-between text-xs font-semibold">

                              <span className="text-slate-500">
                                Question score
                              </span>

                              <span className="text-white">
                                {questionScore.toFixed(
                                  1
                                )}{" "}
                                / 10
                              </span>

                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                              <div
                                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
                                style={{
                                  width: `${getScorePercentage(
                                    questionScore
                                  )}%`,
                                }}
                              />

                            </div>

                          </div>

                        </div>


                        {/* Candidate answer */}

                        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                          <div className="flex items-center gap-2">

                            <MessageSquareText className="size-4 text-brand-300" />

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Your answer
                            </p>

                          </div>

                          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                            {question.userAnswer ||
                              "No answer provided."}
                          </p>

                        </div>


                        {/* Feedback */}

                        <div className="mt-5 grid gap-5 lg:grid-cols-3">

                          <FeedbackList
                            title="Strengths"
                            items={
                              question.feedback
                                ?.strengths
                            }
                            icon={CheckCircle2}
                            iconClass="bg-emerald-400/10 text-emerald-400"
                          />

                          <FeedbackList
                            title="Weaknesses"
                            items={
                              question.feedback
                                ?.weaknesses
                            }
                            icon={AlertCircle}
                            iconClass="bg-amber-400/10 text-amber-400"
                          />

                          <FeedbackList
                            title="Suggestions"
                            items={
                              question.feedback
                                ?.suggestions
                            }
                            icon={Lightbulb}
                            iconClass="bg-cyan-400/10 text-cyan-400"
                          />

                        </div>


                        {/* Ideal answer */}

                        {question.idealAnswer && (
                          <div className="mt-6 rounded-2xl border border-brand-400/15 bg-brand-400/[0.04] p-5">

                            <div className="flex items-center gap-2">

                              <Sparkles className="size-4 text-brand-300" />

                              <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
                                Ideal answer
                              </p>

                            </div>

                            <p className="mt-4 text-sm leading-7 text-slate-400">
                              {question.idealAnswer}
                            </p>

                          </div>
                        )}

                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* Bottom CTA */}

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center sm:p-10">

          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-300">
            <Sparkles className="size-5" />
          </span>

          <h2 className="mt-5 text-2xl font-bold">
            Ready for another round?
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Practice again with a different role,
            difficulty, or technology stack and track
            how your performance improves.
          </p>

          <Link
            to="/interviews/create"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:-translate-y-0.5"
          >
            Start another interview
            <ArrowLeft className="size-4 rotate-180" />
          </Link>

        </section>

      </main>

    </div>
  );
}


export default InterviewResultPage;