import mongoose from "mongoose";

// Define the place schema
const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    entryFee: { type: Number, required: true },
    openingHours: { type: String, required: true },
    closingHours: { type: String, required: true },
    daysOfOperation: { type: String, required: true },
    averageRating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
