import Interview from "../models/Interview.js";
import { generateInterviewQuestions } from "../services/aiService.js";

import {
  evaluateInterviewAnswers,
} from "../services/answerEvaluationService.js";

// Create a new interview
export const createInterview = async (req, res) => {
  try {
    const {
      title,
      jobRole,
      interviewType,
      experienceLevel,
      difficulty,
      technologies,
      numberOfQuestions,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !jobRole ||
      !interviewType ||
      !experienceLevel ||
      !numberOfQuestions
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, job role, interview type, experience level, and number of questions are required",
      });
    }

    // Create interview and attach logged-in user
    const interview = await Interview.create({
      user: req.user._id,
      title: title.trim(),
      jobRole: jobRole.trim(),
      interviewType,
      experienceLevel,
      difficulty: difficulty || "medium",
      technologies: Array.isArray(technologies)
        ? technologies.map((technology) => technology.trim())
        : [],
      numberOfQuestions,
    });

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("Create interview error:", error);

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationMessages = Object.values(error.errors).map(
        (validationError) => validationError.message
      );

      return res.status(400).json({
        success: false,
        message: validationMessages[0],
        errors: validationMessages,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create interview",
    });
  }
};

export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    console.error("Get interviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch interviews",
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const interviewData = interview.toObject();

if (interview.status !== "completed") {
  interviewData.questions = interviewData.questions.map(
    ({ idealAnswer, ...question }) => question
  );
}

return res.status(200).json({
  success: true,
  interview: interviewData,
});
  } catch (error) {
    console.error("Get interview error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to fetch interview",
    });
  }
};

export const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const allowedFields = [
      "title",
      "jobRole",
      "interviewType",
      "experienceLevel",
      "difficulty",
      "technologies",
      "numberOfQuestions",
      "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        interview[field] = req.body[field];
      }
    });

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    console.error("Update interview error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (item) => item.message
      );

      return res.status(400).json({
        success: false,
        message: messages[0],
        errors: messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update interview",
    });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error("Delete interview error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to delete interview",
    });
  }
};

export const generateQuestions = async (req, res) => {
  let interview;

  try {
    // Find the interview and verify that it belongs to
    // the currently logged-in user
    interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // Prevent generation for interviews that have already progressed
    if (interview.status !== "draft") {
      return res.status(400).json({
        success: false,
        message:
          "Questions can only be generated for a draft interview",
      });
    }

    // Mark the interview as generating before calling OpenAI
    interview.status = "generating";
    await interview.save();

    // Generate structured questions through the AI service
    const generatedQuestions =
      await generateInterviewQuestions(interview);

    // Store the generated questions in MongoDB
    interview.questions = generatedQuestions;
    interview.status = "ready";
    interview.currentQuestionIndex = 0;

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview questions generated successfully",
      interview: {
        id: interview._id,
        title: interview.title,
        jobRole: interview.jobRole,
        interviewType: interview.interviewType,
        experienceLevel: interview.experienceLevel,
        difficulty: interview.difficulty,
        technologies: interview.technologies,
        numberOfQuestions: interview.numberOfQuestions,
        status: interview.status,
        questions: interview.questions,
        createdAt: interview.createdAt,
        updatedAt: interview.updatedAt,
      },
    });
  } catch (error) {
    console.error(
      "Generate interview questions error:",
      error
    );

    /*
      If question generation fails after the interview was changed
      to "generating", return it to "draft" so the user can retry.
    */
    if (interview && interview.status === "generating") {
      try {
        interview.status = "draft";
        await interview.save();
      } catch (resetError) {
        console.error(
          "Failed to reset interview status:",
          resetError
        );
      }
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    if (error.status === 401) {
      return res.status(500).json({
        success: false,
        message:
          "The OpenAI API key is invalid or could not be authenticated",
      });
    }

    if (error.status === 429) {
      return res.status(503).json({
        success: false,
        message:
          "The AI service usage limit was reached. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to generate interview questions",
    });
  }
};
export const startInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status !== "ready") {
      return res.status(400).json({
        success: false,
        message: "Interview is not ready to start",
      });
    }

    interview.status = "in-progress";
    interview.startedAt = new Date();
    interview.currentQuestionIndex = 0;

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview started successfully",
      interview,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to start interview",
    });
  }
};
export const saveAnswer = async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer || !answer.trim()) {
      return res.status(400).json({
        success: false,
        message: "Answer is required",
      });
    }

    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status !== "in-progress") {
      return res.status(400).json({
        success: false,
        message: "Interview must be in progress to submit answers",
      });
    }

    const question = interview.questions.id(
      req.params.questionId
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    question.userAnswer = answer.trim();
    question.answeredAt = new Date();

    const questionIndex = interview.questions.findIndex(
      (item) =>
        item._id.toString() === req.params.questionId
    );

    if (questionIndex !== -1) {
      interview.currentQuestionIndex = Math.min(
        questionIndex + 1,
        interview.questions.length - 1
      );
    }

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Answer saved successfully",
      question: {
        id: question._id,
        questionText: question.questionText,
        userAnswer: question.userAnswer,
        answeredAt: question.answeredAt,
      },
      currentQuestionIndex:
        interview.currentQuestionIndex,
    });
  } catch (error) {
    console.error("Save answer error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid interview or question ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to save answer",
    });
  }
};
export const completeInterview = async (req, res) => {
  let interview;

  try {
    interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status !== "in-progress") {
      return res.status(400).json({
        success: false,
        message:
          "Only an interview in progress can be completed",
      });
    }

    const unansweredQuestions =
      interview.questions.filter(
        (question) => !question.userAnswer.trim()
      );

    if (unansweredQuestions.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please answer all questions before completing the interview. ${unansweredQuestions.length} question(s) are unanswered.`,
      });
    }

    interview.status = "evaluating";
    await interview.save();

    const evaluation =
      await evaluateInterviewAnswers(interview);

    interview.questions.forEach((question, index) => {
      const result =
        evaluation.evaluatedQuestions[index];

      question.score = result.score;
      question.feedback.strengths =
        result.strengths;
      question.feedback.weaknesses =
        result.weaknesses;
      question.feedback.suggestions =
        result.suggestions;
    });

    interview.overallScore =
      evaluation.overallScore;

    interview.overallFeedback =
      evaluation.overallFeedback;

    interview.status = "completed";
    interview.completedAt = new Date();
    interview.currentQuestionIndex =
      interview.questions.length - 1;

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview completed successfully",
      result: {
        interviewId: interview._id,
        overallScore: interview.overallScore,
        overallFeedback:
          interview.overallFeedback,
        completedAt: interview.completedAt,
        questions: interview.questions,
      },
    });
  } catch (error) {
    console.error(
      "Complete interview error:",
      error
    );

    if (
      interview &&
      interview.status === "evaluating"
    ) {
      try {
        interview.status = "in-progress";
        await interview.save();
      } catch (resetError) {
        console.error(
          "Failed to reset interview status:",
          resetError
        );
      }
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to complete interview",
    });
  }
};
export const getInterviewResult = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Interview result is not available yet",
      });
    }

    const questionResults = interview.questions.map((question) => ({
      id: question._id,
      questionText: question.questionText,
      category: question.category,
      difficulty: question.difficulty,
      userAnswer: question.userAnswer,
      idealAnswer: question.idealAnswer,
      score: question.score,
      feedback: question.feedback,
      answeredAt: question.answeredAt,
    }));

    return res.status(200).json({
      success: true,
      result: {
        interviewId: interview._id,
        title: interview.title,
        jobRole: interview.jobRole,
        interviewType: interview.interviewType,
        experienceLevel: interview.experienceLevel,
        difficulty: interview.difficulty,
        technologies: interview.technologies,
        overallScore: interview.overallScore,
        overallFeedback: interview.overallFeedback,
        startedAt: interview.startedAt,
        completedAt: interview.completedAt,
        questions: questionResults,
      },
    });
  } catch (error) {
    console.error("Get interview result error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to fetch interview result",
    });
  }
};