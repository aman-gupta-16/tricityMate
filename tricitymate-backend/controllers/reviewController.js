import Review from "../models/reviewModel.js";
import Place from "../models/placeModel.js";

// Add a review and rating for a place
export const addReview = async (req, res) => {
  const { placeId, rating, comment } = req.body;
  const userId = req.user._id;

  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // Add the review
    const review = await Review.create({
      user: userId,
      place: placeId,
      rating,
      comment,
    });

    // Add the review to the place's reviews array
    place.reviews.push(review._id);

    // Update average rating and number of reviews
    const reviews = await Review.find({ place: placeId });
    const avgRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    place.averageRating = avgRating;

    await place.save();

    res.status(201).json({ message: "Review added", review });
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

// Edit a review
export const editReview = async (req, res) => {
  const { reviewId } = req.params; // Review ID from the request parameters
  const { rating, comment } = req.body; // New rating and comment from request body
  const userId = req.user._id; // User ID from the protected route middleware

  try {
    // Find the review by ID
    const review = await Review.findById(reviewId);

    // Check if the review exists
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the review belongs to the logged-in user
    if (review.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can only edit your own review" });
    }

    // Update the review fields
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    // Save the updated review
    const updatedReview = await review.save();

    res.status(200).json({ message: "Review updated", updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
