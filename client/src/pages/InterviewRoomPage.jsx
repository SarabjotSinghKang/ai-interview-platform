import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Save,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";

import {
  getInterviewById,
  saveInterviewAnswer,
  startInterview,
  completeInterview,
} from "../services/interviewService.js";

function InterviewRoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [answer, setAnswer] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isStarting, setIsStarting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const [saved, setSaved] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadInterview = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getInterviewById(id);

        const loadedInterview = data.interview;

        setInterview(loadedInterview);

        setCurrentQuestionIndex(
          loadedInterview.currentQuestionIndex || 0
        );

        const currentQuestion =
          loadedInterview.questions?.[
            loadedInterview.currentQuestionIndex || 0
          ];

        setAnswer(currentQuestion?.userAnswer || "");
      } catch (error) {
        console.error(
          "Get interview error:",
          error
        );

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load this interview."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadInterview();
    }
  }, [id]);

  const handleStartInterview = async () => {
    try {
      setIsStarting(true);
      setErrorMessage("");

      const data = await startInterview(id);

      setInterview(data.interview);

      setCurrentQuestionIndex(
        data.interview.currentQuestionIndex || 0
      );

      const currentQuestion =
        data.interview.questions?.[
          data.interview.currentQuestionIndex || 0
        ];

      setAnswer(currentQuestion?.userAnswer || "");
    } catch (error) {
      console.error(
        "Start interview error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to start the interview."
      );
    } finally {
      setIsStarting(false);
    }
  };

  const handleSaveAnswer = async () => {
    if (!interview) return;

    const currentQuestion =
      interview.questions[currentQuestionIndex];

    if (!currentQuestion) return;

    if (!answer.trim()) {
      setErrorMessage(
        "Please enter an answer before continuing."
      );

      return false;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");
      setSaved(false);

      const data = await saveInterviewAnswer(
        id,
        currentQuestion._id,
        answer
      );

      setInterview((current) => ({
        ...current,
        questions: current.questions.map(
          (question, index) =>
            index === currentQuestionIndex
              ? {
                  ...question,
                  userAnswer: answer.trim(),
                  answeredAt:
                    data.question.answeredAt,
                }
              : question
        ),
      }));

      setSaved(true);

      return true;
    } catch (error) {
      console.error(
        "Save answer error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to save your answer."
      );

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
  const savedSuccessfully =
    await handleSaveAnswer();

  if (!savedSuccessfully) {
    return;
  }

  // If this is the final question,
  // complete the interview.
  if (isLastQuestion) {
    try {
      setIsCompleting(true);
      setErrorMessage("");

      const data = await completeInterview(id);

      console.log(
        "Interview completed:",
        data
      );

      navigate(`/interviews/${id}/result`);
    } catch (error) {
      console.error(
        "Complete interview error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to complete the interview."
      );
    } finally {
      setIsCompleting(false);
    }

    return;
  }

  // Otherwise move to the next question.
  const nextIndex =
    currentQuestionIndex + 1;

  setCurrentQuestionIndex(nextIndex);

  setAnswer(
    interview.questions[nextIndex]
      ?.userAnswer || ""
  );

  setSaved(false);
};

  const handlePrevious = () => {
    if (currentQuestionIndex <= 0) {
      return;
    }

    const previousIndex =
      currentQuestionIndex - 1;

    setCurrentQuestionIndex(previousIndex);

    setAnswer(
      interview.questions[previousIndex]
        ?.userAnswer || ""
    );

    setSaved(false);
    setErrorMessage("");
  };

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950">
        <div className="flex flex-col items-center gap-4 text-white">
          <LoaderCircle className="size-8 animate-spin text-brand-400" />

          <p className="text-sm font-medium text-slate-400">
            Preparing your interview...
          </p>
        </div>
      </div>
    );
  }

  if (errorMessage && !interview) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 px-5">
        <Card className="max-w-md text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose-50">
            <AlertCircle className="size-7 text-rose-500" />
          </span>

          <h1 className="mt-5 text-xl font-bold text-slate-950">
            Unable to load interview
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {errorMessage}
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-block"
          >
            <Button>
              <ArrowLeft className="size-4" />
              Back to dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!interview) {
    return null;
  }

  const questions = interview.questions || [];

  const currentQuestion =
    questions[currentQuestionIndex];

  const totalQuestions = questions.length;

  const progress =
    totalQuestions > 0
      ? ((currentQuestionIndex + 1) /
          totalQuestions) *
        100
      : 0;

  const isInProgress =
    interview.status === "in-progress";

  const isLastQuestion =
    currentQuestionIndex ===
    totalQuestions - 1;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to="/dashboard"
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="size-5" />
            </Link>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                {interview.title}
              </p>

              <p className="truncate text-xs text-slate-500">
                {interview.jobRole}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <Badge variant="dark">
              <Clock3 className="mr-1.5 size-3.5" />
              {interview.difficulty}
            </Badge>

            <span className="text-sm font-semibold text-slate-400">
              {currentQuestionIndex + 1} /{" "}
              {totalQuestions}
            </span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="h-1 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {!isInProgress ? (
          <Card className="overflow-hidden border-white/10 bg-white/[0.04] p-0">
            <div className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-500/10 blur-3xl" />

              <div className="relative">
                <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-brand-500/10 text-brand-300">
                  <Sparkles className="size-7" />
                </span>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
                  AI interview ready
                </p>

                <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                  {interview.title}
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
                  You have {totalQuestions} questions
                  prepared for your{" "}
                  {interview.jobRole} interview.
                  Answer naturally and treat this like
                  a real interview.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Badge variant="dark">
                    {interview.experienceLevel}
                  </Badge>

                  <Badge variant="dark">
                    {interview.difficulty}
                  </Badge>

                  <Badge variant="dark">
                    {interview.interviewType}
                  </Badge>
                </div>

                <Button
                  size="lg"
                  onClick={handleStartInterview}
                  isLoading={isStarting}
                  className="mt-10"
                >
                  Start interview
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Question heading */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-brand-300">
                  <Sparkles className="size-3.5" />
                  AI Interview
                </span>

                <span className="text-sm text-slate-500">
                  Question {currentQuestionIndex + 1} of{" "}
                  {totalQuestions}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Take your time.
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Answer as if you're speaking directly
                with an interviewer.
              </p>
            </div>

            {/* Question */}
            <Card className="border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
                Interview question
              </p>

              <h2 className="mt-5 text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                {currentQuestion?.questionText}
              </h2>

              {/* Answer */}
              <div className="mt-10">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label
                    htmlFor="answer"
                    className="text-sm font-bold text-slate-200"
                  >
                    Your answer
                  </label>

                  {saved && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="size-4" />
                      Answer saved
                    </span>
                  )}
                </div>

                <textarea
                  id="answer"
                  value={answer}
                  onChange={(event) => {
                    setAnswer(event.target.value);
                    setSaved(false);
                    setErrorMessage("");
                  }}
                  placeholder="Type your answer here..."
                  rows={10}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-brand-400/50 focus:ring-4 focus:ring-brand-500/10"
                />

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <Save className="size-3.5" />
                  Your answer is saved when you
                  continue.
                </div>
              </div>

              {errorMessage && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {errorMessage}
                </div>
              )}
            </Card>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <Button
                variant="secondary"
                onClick={handlePrevious}
                disabled={
                  currentQuestionIndex === 0 ||
                  isSaving
                }
              >
                <ArrowLeft className="size-4" />
                Previous
              </Button>

              <Button
  onClick={handleNext}
  isLoading={isSaving || isCompleting}
  disabled={
    !answer.trim() ||
    isCompleting
  }
>
  {isLastQuestion
    ? "Finish interview"
    : "Save & continue"}

  {!isSaving && !isCompleting && (
    <ArrowRight className="size-4" />
  )}
</Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default InterviewRoomPage;