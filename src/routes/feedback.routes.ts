import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { submitFeedback, getAllFeedbacks } from "../controllers/feedback.controller";
import { submitFeedbackValidation } from "../Validation/feedback.validations";

const router = express.Router();

router.post(
  "/:complaintId",
  authMiddleware,
  submitFeedbackValidation,
  submitFeedback
);

router.get(
  "/",
  authMiddleware,
  getAllFeedbacks
);

export { router as FeedbackRoutes };