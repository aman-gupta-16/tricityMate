import cloudinary from "../config/cloudinary.js";
import getDataUri from "../config/dataUri.js";
import Place from "../models/placeModel.js";

export const addPlace = async (req, res) => {
  const {
    name,
    description,
    category,
    location,
    entryFee,
    openingHours,
    closingHours,
    daysOfOperation,
  } = req.body;

  const files = req.files; // Use req.files for multiple files

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." }); // Check if files array is empty
  }

  try {
    const imageUrls = []; // To hold uploaded image URLs

    // Loop through each file and upload
    for (let file of files) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      imageUrls.push(cloudResponse.secure_url); // Collect the URLs
    }

    const newPlace = new Place({
      name,
      description,
      category,
      location,
      entryFee,
      openingHours,
      closingHours,
      daysOfOperation,
      images: imageUrls, // Store as an array of strings
      averageRating: 0, // Set a default rating if applicable
    });

    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding place", error: error.message });
  }
};

//get all places

export const getAllPlaces = async (req, res) => {
  try {
    // Fetch places and populate reviews and users
    const places = await Place.find({}).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name",
      },
    });

    // Calculate average ratings for each place
    const placesWithRatings = places.map((place) => {
      const reviews = place.reviews || []; // Get reviews for the place
      const averageRating =
        reviews.length > 0
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
            reviews.length
          : 0; // Calculate average rating, default to 0 if no reviews

      return {
        ...place._doc, // Spread existing place data
        averageRating: averageRating.toFixed(1), // Add average rating, formatted to one decimal place
      };
    });

    res.json(placesWithRatings); // Return places with average ratings
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching places", error: error.message });
  }
};

// Get details of a single place
export const getPlaceDetails = async (req, res) => {
  const { placeId } = req.params;

  try {
    // Find the place by ID and populate its reviews and review user details
    const place = await Place.findById(placeId).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name",
      },
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // Calculate the average rating
    const reviews = place.reviews;
    const averageRating = reviews.length
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

    res.json({
      _id: place._id,
      name: place.name,
      description: place.description,
      location: place.location,
      category: place.category,
      entryFee: place.entryFee,
      openingHours: place.openingHours,
      closingHours: place.closingHours,
      daysOfOperation: place.daysOfOperation,
      images: place.images,
      reviews: place.reviews,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit an existing place
export const editPlace = async (req, res) => {
  const { placeId } = req.params; // Get placeId from request parameters
  const {
    name,
    description,
    location,
    category,
    entryFee,
    openingHours,
    closingHours,
    daysOfOperation,
    images,
  } = req.body; // Get updated place details from request body

  try {
    // Find the place by ID
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // Update place fields with new data
    place.name = name || place.name;
    place.description = description || place.description;
    place.location = location || place.location;
    place.category = category || place.category;
    place.entryFee = entryFee || place.entryFee;
    place.openingHours = openingHours || place.openingHours;
    place.closingHours = closingHours || place.closingHours;
    place.daysOfOperation = daysOfOperation || place.daysOfOperation;
    place.images = images || place.images;

    // Save the updated place
    await place.save();

    res.status(200).json({ message: "Place updated successfully", place });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
