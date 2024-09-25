import Review from "../models/reviewModel.js";
import Place from "../models/placeModel.js";

// Add a review and rating for a place
export const addReview = async (req, res) => {
  const { placeId, rating, reviewText } = req.body;
  const userId = req.user._id;

  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    const existingReview = await Review.findOne({
      user: userId,
      place: placeId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this place" });
    }

    const review = await Review.create({
      user: userId,
      place: placeId,
      rating,
      reviewText,
    });

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews for a place
export const getReviewsForPlace = async (req, res) => {
  const { placeId } = req.params;

  try {
    const reviews = await Review.find({ place: placeId }).populate(
      "user",
      "name"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get average rating for a place
export const getAverageRating = async (req, res) => {
  const { placeId } = req.params;

  try {
    const reviews = await Review.find({ place: placeId });
    if (reviews.length === 0) {
      return res.json({ averageRating: 0 });
    }

    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews by the current user
export const getUserReviews = async (req, res) => {
  const userId = req.user._id;

  try {
    // Fetch all reviews by the logged-in user
    const reviews = await Review.find({ user: userId }).populate(
      "place",
      "name"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
