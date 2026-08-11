import express from "express";

import {
  createInterview,
  getMyInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  generateQuestions,
  startInterview,
  saveAnswer,
  completeInterview,
  getInterviewResult,
} from "../controllers/interviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createInterview)
  .get(protect, getMyInterviews);

router.post(
  "/:id/generate-questions",
  protect,
  generateQuestions
);

router.post(
  "/:id/start",
  protect,
  startInterview
);

router.patch(
  "/:id/questions/:questionId/answer",
  protect,
  saveAnswer
);

router.post(
  "/:id/complete",
  protect,
  completeInterview
);

router.get(
  "/:id/result",
  protect,
  getInterviewResult
);

router
  .route("/:id")
  .get(protect, getInterviewById)
  .patch(protect, updateInterview)
  .delete(protect, deleteInterview);

export default router;