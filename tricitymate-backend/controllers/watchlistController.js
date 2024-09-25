import User from "../models/userModel.js";
import Place from "../models/placeModel.js";

// Add place to the user's watchlist
export const addToWatchlist = async (req, res) => {
  const userId = req.user._id;
  const { placeId } = req.body;

  try {
    const user = await User.findById(userId);
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    // Check if place is already in the watchlist
    if (user.watchlist.includes(placeId)) {
      return res.status(400).json({ message: "Place already in watchlist" });
    }

    user.watchlist.push(placeId);
    await user.save();

    res
      .status(200)
      .json({ message: "Place added to watchlist", watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove place from watchlist
export const removeFromWatchlist = async (req, res) => {
  const userId = req.user._id;
  const { placeId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user.watchlist.includes(placeId)) {
      return res.status(400).json({ message: "Place not in watchlist" });
    }

    user.watchlist = user.watchlist.filter((id) => id.toString() !== placeId);
    await user.save();

    res
      .status(200)
      .json({
        message: "Place removed from watchlist",
        watchlist: user.watchlist,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user's watchlist
export const getWatchlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate(
      "watchlist",
      "name description"
    );

    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
