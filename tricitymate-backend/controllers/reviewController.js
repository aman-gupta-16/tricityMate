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
    const reviews = await Review.find({ place: placeId }).populate(
      "user",
      "name"
    );

    const avgRating =
      reviews.length > 0
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
          ).toFixed(1)
        : 0;
    place.averageRating = avgRating;

    await place.save();

    // Populate user details for the new review before sending the response
    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name"
    );

    res.status(201).json({ message: "Review added", review: populatedReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all reviews by the current user
export const getUserReviews = async (req, res) => {
  const userId = req.user._id;

  try {
    // Populate 'place' to include 'name' and 'images' (fetch the first image)
    const reviews = await Review.find({ user: userId }).populate(
      "place",
      "name images"
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

// Get all review for places

export const getAllReviewsByPlace = async (req, res) => {
  const { placeId } = req.params;
  try {
    // Find the place by ID and populate the reviews field
    const placeWithReviews = await Place.findById(placeId).populate({
      path: "reviews",
      populate: { path: "user", select: "name" }, // Populate user details in each review
    });

    if (!placeWithReviews) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json(placeWithReviews.reviews); // Send only the reviews array
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
