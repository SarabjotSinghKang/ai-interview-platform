import {
  ArrowRight,
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../context/AuthContext.jsx";
import { getMyInterviews } from "../services/interviewService.js";

import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import StatCard from "../components/ui/StatCard.jsx";

const statusVariant = {
  draft: "default",
  generating: "warning",
  ready: "primary",
  "in-progress": "warning",
  evaluating: "warning",
  completed: "success",
  cancelled: "danger",
};

const statusLabel = {
  draft: "Draft",
  generating: "Generating",
  ready: "Ready",
  "in-progress": "In progress",
  evaluating: "Evaluating",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(dateValue) {
  if (!dateValue) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function DashboardPage() {
  const { user } = useAuth();

  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getMyInterviews();
        setInterviews(data.interviews || []);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load your dashboard."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInterviews();
  }, []);

  const dashboardStats = useMemo(() => {
    const completedInterviews = interviews.filter(
      (interview) => interview.status === "completed"
    );

    const activeInterviews = interviews.filter((interview) =>
      ["ready", "in-progress"].includes(interview.status)
    );

    const scoredInterviews = completedInterviews.filter(
      (interview) => typeof interview.overallScore === "number"
    );

    const averageScore =
      scoredInterviews.length > 0
        ? (
            scoredInterviews.reduce(
              (total, interview) =>
                total + interview.overallScore,
              0
            ) / scoredInterviews.length
          ).toFixed(1)
        : "—";

    const highestScore =
      scoredInterviews.length > 0
        ? Math.max(
            ...scoredInterviews.map(
              (interview) => interview.overallScore
            )
          ).toFixed(1)
        : "—";

    return {
      total: interviews.length,
      completed: completedInterviews.length,
      active: activeInterviews.length,
      averageScore,
      highestScore,
    };
  }, [interviews]);

  const recentInterviews = interviews.slice(0, 4);

  const continueInterview = interviews.find(
    (interview) => interview.status === "in-progress"
  );

  if (isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm font-medium text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
            <Sparkles className="size-3.5" />
            Preparation workspace
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Welcome back,{" "}
            {user?.name?.split(" ")[0] || "there"}.
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Review your progress, continue active sessions,
            and start practising for your next opportunity.
          </p>
        </div>

        <Link to="/interviews/create">
          <Button size="lg" className="w-full sm:w-auto">
            <Plus className="size-5" />
            Create interview
          </Button>
        </Link>
      </section>

      {errorMessage && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
          {errorMessage}
        </div>
      )}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total interviews"
          value={dashboardStats.total}
          description="All practice sessions"
          icon={CalendarDays}
        />

        <StatCard
          title="Completed"
          value={dashboardStats.completed}
          description="Finished sessions"
          icon={CheckCircle2}
        />

        <StatCard
          title="Average score"
          value={dashboardStats.averageScore}
          description="Out of 10"
          icon={BarChart3}
        />

        <StatCard
          title="Highest score"
          value={dashboardStats.highestScore}
          description="Personal best"
          icon={Award}
        />
      </section>

      {continueInterview && (
        <section>
          <Card className="relative overflow-hidden border-brand-200 bg-gradient-to-br from-brand-600 via-brand-700 to-slate-950 text-white shadow-xl shadow-brand-500/15">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <Badge className="border border-white/10 bg-white/10 text-white">
                  Continue where you stopped
                </Badge>

                <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                  {continueInterview.title}
                </h2>

                <p className="mt-3 leading-7 text-brand-100">
                  {continueInterview.jobRole} ·{" "}
                  {continueInterview.experienceLevel} ·{" "}
                  {continueInterview.difficulty}
                </p>

                <div className="mt-6 flex flex-wrap gap-5 text-sm text-brand-100">
                  <span className="flex items-center gap-2">
                    <Target className="size-4" />
                    Question{" "}
                    {continueInterview.currentQuestionIndex + 1} of{" "}
                    {continueInterview.numberOfQuestions}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 className="size-4" />
                    Started{" "}
                    {formatDate(continueInterview.startedAt)}
                  </span>
                </div>
              </div>

              <Link to={`/interviews/${continueInterview._id}`}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full border-white/15 bg-white/10 hover:bg-white/15 lg:w-auto"
                >
                  Continue interview
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Recent interviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest preparation sessions
              </p>
            </div>

            <Link
              to="/interviews"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition hover:text-brand-500"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {recentInterviews.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No interviews yet"
              description="Create your first interview session and start building your preparation history."
              actionLabel="Create interview"
              onAction={() => {
                window.location.href = "/interviews/create";
              }}
            />
          ) : (
            <div className="mt-6 divide-y divide-slate-100">
              {recentInterviews.map((interview) => (
                <Link
                  key={interview._id}
                  to={
                    interview.status === "completed"
                      ? `/interviews/${interview._id}/result`
                      : `/interviews/${interview._id}`
                  }
                  className="group flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="truncate font-bold text-slate-900 transition group-hover:text-brand-600">
                        {interview.title}
                      </h3>

                      <Badge
                        variant={
                          statusVariant[interview.status] ||
                          "default"
                        }
                      >
                        {statusLabel[interview.status] ||
                          interview.status}
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {interview.jobRole} ·{" "}
                      {interview.experienceLevel} ·{" "}
                      {interview.numberOfQuestions} questions
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-5 sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        {interview.status === "completed"
                          ? "Score"
                          : "Created"}
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {interview.status === "completed" &&
                        typeof interview.overallScore === "number"
                          ? `${interview.overallScore}/10`
                          : formatDate(interview.createdAt)}
                      </p>
                    </div>

                    <ArrowRight className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active sessions
                </p>

                <p className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
                  {dashboardStats.active}
                </p>
              </div>

              <span className="grid size-14 place-items-center rounded-2xl bg-amber-50">
                <Clock3 className="size-6 text-amber-600" />
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              Interviews that are ready to begin or currently
              in progress.
            </p>
          </Card>

          <Card className="bg-slate-950 text-white">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-500/15">
              <TrendingUp className="size-5 text-brand-300" />
            </span>

            <h2 className="mt-6 text-xl font-bold">
              Build a consistent practice habit
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Complete focused sessions regularly and review
              your feedback before the next interview.
            </p>

            <Link
              to="/interviews/create"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition hover:text-brand-200"
            >
              Start another session
              <ArrowRight className="size-4" />
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;