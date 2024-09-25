import express from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../controllers/watchlistController.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensure user is logged in

const router = express.Router();

router.post("/add", protect, addToWatchlist); // Add a place to watchlist
router.post("/remove", protect, removeFromWatchlist); // Remove a place from watchlist
router.get("/", protect, getWatchlist); // Get user's watchlist

export default router;
