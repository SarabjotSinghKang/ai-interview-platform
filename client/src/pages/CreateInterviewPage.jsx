import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ClipboardCheck,
  Code2,
  Gauge,
  GraduationCap,
  Hash,
  Layers3,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Input from "../components/ui/Input.jsx";
import StepIndicator from "../components/ui/StepIndicator.jsx";
import TagSelector from "../components/ui/TagSelector.jsx";

import {
  createInterview,
  generateInterviewQuestions,
} from "../services/interviewService.js";

const steps = [
  "Role",
  "Type",
  "Experience",
  "Difficulty",
  "Technologies",
  "Questions",
  "Review",
];

const interviewTypeOptions = [
  {
    value: "technical",
    title: "Technical interview",
    description:
      "Practise technology, programming, architecture, and development questions.",
    icon: Code2,
  },
  {
    value: "behavioral",
    title: "Behavioural interview",
    description:
      "Prepare answers about teamwork, challenges, leadership, and decision-making.",
    icon: MessageSquareText,
  },
  {
    value: "mixed",
    title: "Mixed interview",
    description:
      "Combine technical and behavioural questions in one complete session.",
    icon: Layers3,
  },
];

const experienceOptions = [
  {
    value: "fresher",
    title: "Fresher",
    description:
      "Students, recent graduates, and candidates applying for their first role.",
    icon: GraduationCap,
  },
  {
    value: "junior",
    title: "Junior",
    description:
      "Candidates with practical project experience or up to two years of work.",
    icon: BriefcaseBusiness,
  },
  {
    value: "mid-level",
    title: "Mid-level",
    description:
      "Developers expected to work independently and make technical decisions.",
    icon: UserRoundSearch,
  },
  {
    value: "senior",
    title: "Senior",
    description:
      "Experienced candidates preparing for advanced technical and leadership roles.",
    icon: ShieldCheck,
  },
];

const difficultyOptions = [
  {
    value: "easy",
    title: "Easy",
    description:
      "Core definitions, fundamentals, and beginner-level concepts.",
    icon: Gauge,
  },
  {
    value: "medium",
    title: "Medium",
    description:
      "Practical understanding, comparisons, and applied problem-solving.",
    icon: ClipboardCheck,
  },
  {
    value: "hard",
    title: "Hard",
    description:
      "Advanced concepts, architecture, trade-offs, and deeper reasoning.",
    icon: Sparkles,
  },
];

const technologyOptions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express", label: "Express" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "SQL", label: "SQL" },
  { value: "DBMS", label: "DBMS" },
  { value: "DSA", label: "DSA" },
  { value: "Git", label: "Git" },
];

const questionCountOptions = [5, 8, 10];

function SelectionCard({
  option,
  selected,
  onSelect,
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`
        group relative w-full rounded-3xl border p-5 text-left
        transition duration-200
        ${
          selected
            ? "border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/10"
            : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-slate-200/70"
        }
      `}
    >
      {selected && (
        <span className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-brand-500 text-white">
          <Check className="size-4" />
        </span>
      )}

      <span
        className={`
          grid size-12 place-items-center rounded-2xl transition
          ${
            selected
              ? "bg-brand-500 text-white"
              : "bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600"
          }
        `}
      >
        <Icon className="size-5" />
      </span>

      <h3 className="mt-5 text-base font-bold text-slate-950">
        {option.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {option.description}
      </p>
    </button>
  );
}

function ReviewItem({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
        <Icon className="size-4" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold capitalize text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function CreateInterviewPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] =
    useState(0);

  const [formData, setFormData] = useState({
    title: "",
    jobRole: "",
    interviewType: "",
    experienceLevel: "",
    difficulty: "",
    technologies: [],
    numberOfQuestions: 5,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] =
    useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setServerError("");
  };

  const validateCurrentStep = () => {
    const nextErrors = {};

    if (currentStep === 0) {
      if (!formData.title.trim()) {
        nextErrors.title =
          "Interview title is required";
      }

      if (!formData.jobRole.trim()) {
        nextErrors.jobRole =
          "Job role is required";
      }
    }

    if (
      currentStep === 1 &&
      !formData.interviewType
    ) {
      nextErrors.interviewType =
        "Select an interview type";
    }

    if (
      currentStep === 2 &&
      !formData.experienceLevel
    ) {
      nextErrors.experienceLevel =
        "Select an experience level";
    }

    if (
      currentStep === 3 &&
      !formData.difficulty
    ) {
      nextErrors.difficulty =
        "Select a difficulty";
    }

    if (
      currentStep === 4 &&
      formData.interviewType !== "behavioral" &&
      formData.technologies.length === 0
    ) {
      nextErrors.technologies =
        "Select at least one technology";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((current) =>
      Math.min(current + 1, steps.length - 1)
    );
  };

  const handlePrevious = () => {
    setErrors({});
    setServerError("");

    setCurrentStep((current) =>
      Math.max(current - 1, 0)
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setServerError("");

      const createdResponse =
        await createInterview({
          title: formData.title.trim(),
          jobRole: formData.jobRole.trim(),
          interviewType:
            formData.interviewType,
          experienceLevel:
            formData.experienceLevel,
          difficulty: formData.difficulty,
          technologies: formData.technologies,
          numberOfQuestions:
            formData.numberOfQuestions,
        });

      const createdInterview =
        createdResponse.interview;

      const interviewId =
        createdInterview?._id ||
        createdInterview?.id;

      if (!interviewId) {
        throw new Error(
          "The backend did not return an interview ID"
        );
      }

      await generateInterviewQuestions(
        interviewId
      );

      navigate(`/interviews/${interviewId}`, {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Create interview error:",
        error
      );

      setServerError(
        error.response?.data?.message ||
          error.message ||
          "Unable to create the interview. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedType = useMemo(
    () =>
      interviewTypeOptions.find(
        (option) =>
          option.value ===
          formData.interviewType
      ),
    [formData.interviewType]
  );

  const selectedExperience = useMemo(
    () =>
      experienceOptions.find(
        (option) =>
          option.value ===
          formData.experienceLevel
      ),
    [formData.experienceLevel]
  );

  const selectedDifficulty = useMemo(
    () =>
      difficultyOptions.find(
        (option) =>
          option.value ===
          formData.difficulty
      ),
    [formData.difficulty]
  );

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div>
          <div className="mb-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <BriefcaseBusiness className="size-5" />
            </span>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              What role are you preparing for?
            </h2>

            <p className="mt-2 leading-7 text-slate-500">
              Give the session a clear title and
              specify the target job role.
            </p>
          </div>

          <div className="space-y-5">
            <Input
              id="title"
              name="title"
              type="text"
              label="Interview title"
              placeholder="MERN Stack Practice Interview"
              value={formData.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value
                )
              }
              error={errors.title}
              autoFocus
            />

            <Input
              id="jobRole"
              name="jobRole"
              type="text"
              label="Target job role"
              placeholder="MERN Stack Developer"
              value={formData.jobRole}
              onChange={(event) =>
                updateField(
                  "jobRole",
                  event.target.value
                )
              }
              error={errors.jobRole}
              helperText="Use the role title you expect to see in a real job description."
            />
          </div>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div>
          <div className="mb-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <MessageSquareText className="size-5" />
            </span>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              Choose the interview style
            </h2>

            <p className="mt-2 leading-7 text-slate-500">
              Select the type of questions you want
              included in this practice session.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {interviewTypeOptions.map(
              (option) => (
                <SelectionCard
                  key={option.value}
                  option={option}
                  selected={
                    formData.interviewType ===
                    option.value
                  }
                  onSelect={(value) =>
                    updateField(
                      "interviewType",
                      value
                    )
                  }
                />
              )
            )}
          </div>

          {errors.interviewType && (
            <p className="mt-4 text-sm font-medium text-rose-600">
              {errors.interviewType}
            </p>
          )}
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div>
          <div className="mb-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <GraduationCap className="size-5" />
            </span>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              Select your experience level
            </h2>

            <p className="mt-2 leading-7 text-slate-500">
              This helps us match the depth and
              complexity of the questions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {experienceOptions.map(
              (option) => (
                <SelectionCard
                  key={option.value}
                  option={option}
                  selected={
                    formData.experienceLevel ===
                    option.value
                  }
                  onSelect={(value) =>
                    updateField(
                      "experienceLevel",
                      value
                    )
                  }
                />
              )
            )}
          </div>

          {errors.experienceLevel && (
            <p className="mt-4 text-sm font-medium text-rose-600">
              {errors.experienceLevel}
            </p>
          )}
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div>
          <div className="mb-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <Gauge className="size-5" />
            </span>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              Set the question difficulty
            </h2>

            <p className="mt-2 leading-7 text-slate-500">
              Choose a level that challenges you
              without making the session unrealistic.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {difficultyOptions.map(
              (option) => (
                <SelectionCard
                  key={option.value}
                  option={option}
                  selected={
                    formData.difficulty ===
                    option.value
                  }
                  onSelect={(value) =>
                    updateField(
                      "difficulty",
                      value
                    )
                  }
                />
              )
            )}
          </div>

          {errors.difficulty && (
            <p className="mt-4 text-sm font-medium text-rose-600">
              {errors.difficulty}
            </p>
          )}
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div>
          <div className="mb-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <Code2 className="size-5" />
            </span>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              Choose your technologies
            </h2>

            <p className="mt-2 leading-7 text-slate-500">
              Select the technologies and subjects
              that should influence the question set.
            </p>
          </div>

          {formData.interviewType ===
          "behavioral" ? (
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6">
              <p className="font-bold text-brand-900">
                Technologies are optional for a
                behavioural interview.
              </p>

              <p className="mt-2 text-sm leading-6 text-brand-700">
                You may continue without selecting a
                technology, or add technologies to
                give the session more context.
              </p>
            </div>
          ) : null}

          <div
            className={
              formData.interviewType ===
              "behavioral"
                ? "mt-6"
                : ""
            }
          >
            <TagSelector
              label="Technology stack"
              options={technologyOptions}
              selectedValues={
                formData.technologies
              }
              onChange={(values) =>
                updateField(
                  "technologies",
                  values
                )
              }
              error={errors.technologies}
            />
          </div>
        </div>
      );
    }

    if (currentStep === 5) {
      return (
        <div>
          <div className="mb-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <Hash className="size-5" />
            </span>

            <h2 className="mt-5 text-2xl font-bold text-slate-950">
              How long should the interview be?
            </h2>

            <p className="mt-2 leading-7 text-slate-500">
              Select the number of questions for this
              practice session.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {questionCountOptions.map(
              (count) => {
                const isSelected =
                  formData.numberOfQuestions ===
                  count;

                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() =>
                      updateField(
                        "numberOfQuestions",
                        count
                      )
                    }
                    className={`
                      rounded-3xl border p-6 text-center
                      transition duration-200
                      ${
                        isSelected
                          ? "border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/10"
                          : "border-slate-200 bg-white hover:border-brand-200 hover:shadow-lg"
                      }
                    `}
                  >
                    <p
                      className={`
                        text-4xl font-bold
                        ${
                          isSelected
                            ? "text-brand-600"
                            : "text-slate-950"
                        }
                      `}
                    >
                      {count}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      questions
                    </p>

                    <p className="mt-4 text-xs leading-5 text-slate-400">
                      Approximately{" "}
                      {count * 3}–{count * 5} minutes
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-8">
          <span className="grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
            <ClipboardCheck className="size-5" />
          </span>

          <h2 className="mt-5 text-2xl font-bold text-slate-950">
            Review your interview
          </h2>

          <p className="mt-2 leading-7 text-slate-500">
            Confirm the configuration before the
            questions are generated.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ReviewItem
            label="Title"
            value={formData.title}
            icon={BriefcaseBusiness}
          />

          <ReviewItem
            label="Job role"
            value={formData.jobRole}
            icon={UserRoundSearch}
          />

          <ReviewItem
            label="Interview type"
            value={
              selectedType?.title ||
              formData.interviewType
            }
            icon={MessageSquareText}
          />

          <ReviewItem
            label="Experience"
            value={
              selectedExperience?.title ||
              formData.experienceLevel
            }
            icon={GraduationCap}
          />

          <ReviewItem
            label="Difficulty"
            value={
              selectedDifficulty?.title ||
              formData.difficulty
            }
            icon={Gauge}
          />

          <ReviewItem
            label="Questions"
            value={`${formData.numberOfQuestions} questions`}
            icon={Hash}
          />
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            Technologies
          </p>

          {formData.technologies.length >
          0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.technologies.map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm"
                  >
                    {technology}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm font-medium text-slate-500">
              No specific technologies selected
            </p>
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-brand-100 bg-brand-50 p-5">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
              <Sparkles className="size-4" />
            </span>

            <div>
              <p className="font-bold text-brand-900">
                Ready to generate your interview
              </p>

              <p className="mt-1 text-sm leading-6 text-brand-700">
                We’ll create your interview and
                prepare the questions. This usually
                takes only a moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-950"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </button>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            New practice session
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Create a focused interview.
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-500">
            Configure a realistic interview based on
            your target role, experience, and
            technology stack.
          </p>
        </div>
      </div>

      <Card padding="large">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
        />

        <div className="mt-10 border-t border-slate-200 pt-8">
          {serverError && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium leading-6 text-rose-700">
              {serverError}
            </div>
          )}

          {renderStepContent()}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="size-5" />
            Previous
          </Button>

          {currentStep <
          steps.length - 1 ? (
            <Button
              size="lg"
              onClick={handleNext}
              className="w-full sm:w-auto"
            >
              Continue
              <ArrowRight className="size-5" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting
                ? "Preparing interview..."
                : "Generate interview"}

              {!isSubmitting && (
                <Sparkles className="size-5" />
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export default CreateInterviewPage;