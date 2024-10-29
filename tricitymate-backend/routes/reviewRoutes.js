import express from "express";
import {
  addReview,
  getUserReviews,
  editReview,
  getAllReviewsByPlace,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router();

// Review and rating routes
router.post("/add", protect, addReview);
router.get("/user", protect, getUserReviews); // New route for fetching the user's reviews
router.put("/edit/:reviewId", protect, editReview);
router.get("/:placeId", getAllReviewsByPlace);

export default router;
