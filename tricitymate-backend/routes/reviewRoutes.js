import express from "express";
import {
  addReview,
  getReviewsForPlace,
  getAverageRating,
  getUserReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

// Review and rating routes
router.post("/add", protect, addReview);
router.get("/:placeId", getReviewsForPlace);
router.get("/:placeId/average-rating", getAverageRating);
router.get("/user", protect, getUserReviews); // New route for fetching the user's reviews

export default router;
