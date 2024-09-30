import {
  addPlace,
  getAllPlaces,
  getPlaceDetails,
  editPlace,
} from "../controllers/placeController.js";
import { multipleUpload } from "../middleware/multer.js"; // Adjust the path as necessary

import { admin } from "../middleware/admin.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
// Route to add a new place (protected by admin role)
router.post("/add", protect, admin, multipleUpload, addPlace);
router.get("/", getAllPlaces);
router.get("/:placeId", getPlaceDetails);
router.put("/:placeId", protect, admin, editPlace);

export default router;
