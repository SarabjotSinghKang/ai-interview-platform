import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "technical",
        "behavioral",
        "hr",
        "situational",
        "coding",
      ],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    userAnswer: {
      type: String,
      default: "",
      trim: true,
    },

    idealAnswer: {
      type: String,
      default: "",
      trim: true,
    },

    score: {
      type: Number,
      min: 0,
      max: 10,
      default: null,
    },

    feedback: {
      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      suggestions: {
        type: [String],
        default: [],
      },
    },

    answeredAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: true,
  }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Interview title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    jobRole: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
      maxlength: [100, "Job role cannot exceed 100 characters"],
    },

    interviewType: {
      type: String,
      enum: [
        "technical",
        "behavioral",
        "hr",
        "mixed",
        "custom",
      ],
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "mid-level", "senior"],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    technologies: {
      type: [String],
      default: [],
    },

    numberOfQuestions: {
      type: Number,
      required: true,
      min: [1, "At least one question is required"],
      max: [20, "An interview cannot exceed 20 questions"],
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    status: {
  type: String,
  enum: [
    "draft",
    "generating",
    "ready",
    "in-progress",
    "evaluating",
    "completed",
    "cancelled",
  ],
  default: "draft",
},

    currentQuestionIndex: {
      type: Number,
      default: 0,
      min: 0,
    },

    overallScore: {
      type: Number,
      min: 0,
      max: 10,
      default: null,
    },

    overallFeedback: {
      summary: {
        type: String,
        default: "",
      },

      strengths: {
        type: [String],
        default: [],
      },

      areasForImprovement: {
        type: [String],
        default: [],
      },

      recommendedTopics: {
        type: [String],
        default: [],
      },
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;