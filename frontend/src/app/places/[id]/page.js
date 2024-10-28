"use client"; // If using Next.js 13+ with app directory
import React, { useEffect, useState } from "react";
import api from "@/utils/api"; // Use your configured Axios instance
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const PlaceDetails = ({ params }) => {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const placeId = params.id;

  // Assuming useAuth provides user info
  const { user } = useAuth() || {}; // Retrieve user details using useAuth hook

  useEffect(() => {
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const placeResponse = await api.get(`/places/${placeId}`);
        setPlace(placeResponse.data);

        if (user) {
          const watchlistResponse = await api.get("/watchlist");
          const watchlist = watchlistResponse.data;
          const ids = watchlist.map((item) => item._id);
          setWatchlistIds(ids);
        }
      } catch (err) {
        setError("Error fetching data");
        toast.error("Error fetching place details or watchlist");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [placeId, user]);

  const handleAddToWatchlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in to add to your watchlist");
      router.push("/login");
      return;
    }
    try {
      const response = await api.post("/watchlist/add", { placeId: place._id });

      if (response.status === 200) {
        toast.success(`${place.name} added to your watchlist!`);
        if (!watchlistIds.includes(place._id)) {
          setWatchlistIds((prev) => [...prev, place._id]);
        }
      } else {
        throw new Error("Failed to add to watchlist");
      }
    } catch (err) {
      toast.error("Error adding to watchlist");
      console.error(err);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      const response = await api.post("/watchlist/remove", {
        placeId: place._id,
      });

      if (response.status === 200) {
        toast.success(`${place.name} removed from your watchlist!`);
        setWatchlistIds((prev) => prev.filter((id) => id !== place._id));
      } else {
        throw new Error("Failed to remove from watchlist");
      }
    } catch (err) {
      toast.error("Error removing from watchlist");
      console.error(err);
    }
  };

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in to submit a review");
      router.push("/login");
      return;
    }
    try {
      const response = await api.post("/reviews/add", {
        placeId: place._id,
        rating,
        comment,
      });

      if (response.status === 201) {
        toast.success("Review submitted successfully!");
        setPlace((prevPlace) => ({
          ...prevPlace,
          reviews: [...prevPlace.reviews, response.data.review],
        }));
        setRating(0);
        setComment("");
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (err) {
      toast.error("Error submitting review");
    }
  };

  const renderStarsInput = () => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => setRating(star)}
            className={`w-5 h-5 cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15.27L16.18 18l-1.64-7.03L20 7.24l-7.19-.61L10 .25 7.19 6.63 0 7.24l5.46 3.73L3.82 18z" />
          </svg>
        ))}
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {place.name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {place.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={place.name}
              className="w-full h-64 object-cover rounded-md"
            />
          ))}
        </div>
        <p className="text-gray-300 text-lg mb-4">{place.description}</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Average Rating:
          </h2>
          <div className="flex items-center space-x-2">
            {renderStars(place.avgRating)}
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          {watchlistIds.includes(place._id) ? (
            <Button
              onClick={handleRemoveFromWatchlist}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Remove from Watchlist
            </Button>
          ) : (
            <Button
              onClick={handleAddToWatchlist}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Add to Watchlist
            </Button>
          )}
          <Button
            onClick={() => router.back()}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Back to List
          </Button>
          {isAdmin && (
            <Button
              onClick={() => router.push(`/places/edit/${place._id}`)}
              className="bg-yellow-600 text-white hover:bg-yellow-700"
            >
              Edit Place
            </Button>
          )}
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Submit Your Review
          </h2>
          <div className="flex items-center space-x-2 mb-4">
            {renderStarsInput()}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md text-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Write your comment here..."
          />
          <Button
            onClick={handleReviewSubmit}
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

// Function to render stars based on average rating
const renderStars = (rating) => {
  const stars = [];
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-5 h-5 ${
          i <= roundedRating ? "text-yellow-500" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 15.27L16.18 18l-1.64-7.03L20 7.24l-7.19-.61L10 .25 7.19 6.63 0 7.24l5.46 3.73L3.82 18z" />
      </svg>
    );
  }
  return <div className="flex">{stars}</div>;
};

export default PlaceDetails;
