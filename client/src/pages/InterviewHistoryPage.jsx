import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  History,
  Search,
  Target,
  XCircle,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Spinner from "../components/ui/Spinner.jsx";

import { getMyInterviews } from "../services/interviewService.js";


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


function InterviewHistoryPage() {
  const [interviews, setInterviews] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");


  // --------------------------------
  // Load interviews
  // --------------------------------

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data =
          await getMyInterviews();

        setInterviews(
          data.interviews || []
        );
      } catch (error) {
        console.error(
          "Get interview history error:",
          error
        );

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load your interview history."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInterviews();
  }, []);


  // --------------------------------
  // Filter interviews
  // --------------------------------

  const filteredInterviews = useMemo(() => {
    const normalizedSearch =
      searchTerm
        .trim()
        .toLowerCase();

    return interviews.filter(
      (interview) => {
        const matchesStatus =
          statusFilter === "all" ||
          interview.status ===
            statusFilter;

        const matchesSearch =
          !normalizedSearch ||
          interview.title
            ?.toLowerCase()
            .includes(normalizedSearch) ||
          interview.jobRole
            ?.toLowerCase()
            .includes(normalizedSearch) ||
          interview.technologies?.some(
            (technology) =>
              technology
                .toLowerCase()
                .includes(
                  normalizedSearch
                )
          );

        return (
          matchesStatus &&
          matchesSearch
        );
      }
    );
  }, [
    interviews,
    searchTerm,
    statusFilter,
  ]);


  // --------------------------------
  // Statistics
  // --------------------------------

  const completedCount =
    interviews.filter(
      (interview) =>
        interview.status ===
        "completed"
    ).length;

  const activeCount =
    interviews.filter((interview) =>
      [
        "ready",
        "in-progress",
      ].includes(interview.status)
    ).length;


  if (isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />

          <p className="text-sm font-medium text-slate-500">
            Loading your interview history...
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-8">

      {/* -------------------------------- */}
      {/* Header                           */}
      {/* -------------------------------- */}

      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-700">
            <History className="size-3.5" />

            Practice history
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Interview history
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Review your previous practice
            sessions, scores, and interview
            progress.
          </p>

        </div>


        <Link to="/interviews/create">

          <Button
            size="lg"
            className="w-full sm:w-auto"
          >
            Create interview

            <ArrowRight className="size-5" />
          </Button>

        </Link>

      </section>


      {/* -------------------------------- */}
      {/* Error                            */}
      {/* -------------------------------- */}

      {errorMessage && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
          {errorMessage}
        </div>
      )}


      {/* -------------------------------- */}
      {/* Stats                            */}
      {/* -------------------------------- */}

      <section className="grid gap-5 sm:grid-cols-3">

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total interviews
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-950">
                {interviews.length}
              </p>

            </div>

            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50">
              <CalendarDays className="size-5 text-brand-600" />
            </span>

          </div>

        </Card>


        <Card>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-950">
                {completedCount}
              </p>

            </div>

            <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50">
              <CheckCircle2 className="size-5 text-emerald-600" />
            </span>

          </div>

        </Card>


        <Card>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Active
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-950">
                {activeCount}
              </p>

            </div>

            <span className="grid size-12 place-items-center rounded-2xl bg-amber-50">
              <Clock3 className="size-5 text-amber-600" />
            </span>

          </div>

        </Card>

      </section>


      {/* -------------------------------- */}
      {/* Search + Filters                 */}
      {/* -------------------------------- */}

      <Card>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search interviews..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-400/10"
            />

          </div>


          {/* Status filter */}

          <div className="flex flex-wrap gap-2">

            {[
              {
                label: "All",
                value: "all",
              },
              {
                label: "Completed",
                value: "completed",
              },
              {
                label: "In progress",
                value: "in-progress",
              },
              {
                label: "Ready",
                value: "ready",
              },
            ].map((filter) => (

              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setStatusFilter(
                    filter.value
                  )
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  statusFilter ===
                  filter.value
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </button>

            ))}

          </div>

        </div>

      </Card>


      {/* -------------------------------- */}
      {/* Interview list                   */}
      {/* -------------------------------- */}

      <Card>

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="text-xl font-bold text-slate-950">
              Your interviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredInterviews.length}{" "}
              {filteredInterviews.length ===
              1
                ? "interview"
                : "interviews"}{" "}
              found
            </p>

          </div>

        </div>


        {filteredInterviews.length ===
        0 ? (

          <EmptyState
            icon={Target}
            title={
              interviews.length === 0
                ? "No interviews yet"
                : "No matching interviews"
            }
            description={
              interviews.length === 0
                ? "Create your first interview session to start practising."
                : "Try changing your search or status filter."
            }
            actionLabel={
              interviews.length === 0
                ? "Create interview"
                : undefined
            }
            onAction={
              interviews.length === 0
                ? () => {
                    window.location.href =
                      "/interviews/create";
                  }
                : undefined
            }
          />

        ) : (

          <div className="mt-6 divide-y divide-slate-100">

            {filteredInterviews.map(
              (interview) => {

                const isCompleted =
                  interview.status ===
                  "completed";

                const destination =
                  isCompleted
                    ? `/interviews/${interview._id}/result`
                    : `/interviews/${interview._id}`;


                return (
                  <Link
                    key={interview._id}
                    to={destination}
                    className="group block py-6 first:pt-0 last:pb-0"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      {/* Main information */}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="truncate text-lg font-bold text-slate-900 transition group-hover:text-brand-600">
                            {interview.title}
                          </h3>

                          <Badge
                            variant={
                              statusVariant[
                                interview.status
                              ] ||
                              "default"
                            }
                          >
                            {statusLabel[
                              interview.status
                            ] ||
                              interview.status}
                          </Badge>

                        </div>


                        <p className="mt-2 text-sm text-slate-500">
                          {interview.jobRole}{" "}
                          ·{" "}
                          {
                            interview.experienceLevel
                          }{" "}
                          ·{" "}
                          {
                            interview.numberOfQuestions
                          }{" "}
                          questions
                        </p>


                        {/* Technologies */}

                        {interview.technologies
                          ?.length >
                          0 && (
                          <div className="mt-3 flex flex-wrap gap-2">

                            {interview.technologies
                              .slice(0, 5)
                              .map(
                                (
                                  technology
                                ) => (
                                  <span
                                    key={
                                      technology
                                    }
                                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"
                                  >
                                    {
                                      technology
                                    }
                                  </span>
                                )
                              )}

                          </div>
                        )}

                      </div>


                      {/* Right information */}

                      <div className="flex shrink-0 items-center justify-between gap-8 lg:justify-end">

                        <div className="text-left lg:text-right">

                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {isCompleted
                              ? "Score"
                              : "Created"}
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">

                            {isCompleted &&
                            typeof interview.overallScore ===
                              "number"
                              ? `${interview.overallScore}/10`
                              : formatDate(
                                  interview.createdAt
                                )}

                          </p>

                        </div>


                        <div className="grid size-10 place-items-center rounded-xl bg-slate-50 text-slate-300 transition group-hover:bg-brand-50 group-hover:text-brand-600">

                          {interview.status ===
                          "cancelled" ? (
                            <XCircle className="size-5" />
                          ) : (
                            <ArrowRight className="size-5 transition group-hover:translate-x-0.5" />
                          )}

                        </div>

                      </div>

                    </div>

                  </Link>
                );
              }
            )}

          </div>

        )}

      </Card>

    </div>
  );
}


export default InterviewHistoryPage;