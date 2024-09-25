import mongoose from "mongoose";

// Define the place schema
const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "nature",
        "historical",
        "entertainment",
        "shopping",
        "food",
        "others",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
