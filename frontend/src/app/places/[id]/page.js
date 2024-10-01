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
  const [watchlistIds, setWatchlistIds] = useState([]); // State to track watchlist IDs
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const router = useRouter();
  const placeId = params.id;

  // Assuming useAuth provides user info
  const { user } = useAuth() || {}; // Retrieve user details using useAuth hook

  useEffect(() => {
    // Check if user is admin
    if (user && user.role === "admin") {
      setIsAdmin(true); // Set admin status from user details
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch place details
        const placeResponse = await api.get(`/places/${placeId}`);
        setPlace(placeResponse.data);

        // Fetch watchlist status
        const watchlistResponse = await api.get("/watchlist");
        const watchlist = watchlistResponse.data;
        const ids = watchlist.map((item) => item._id); // Adjust according to your response structure
        setWatchlistIds(ids);
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

  // Function to handle adding to the watchlist
  const handleAddToWatchlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in to add to your watchlist");
      router.push("/login");
      return;
    }
    try {
      const response = await api.post("/watchlist/add", {
        placeId: place._id,
      });

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

  // Function to handle removing from the watchlist
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

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
      <div className="flex flex-wrap mb-4">
        {place.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={place.name}
            className="w-full h-64 object-cover rounded-md mb-2 mr-2"
          />
        ))}
      </div>
      <p className="text-gray-700">{place.description}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Average Rating:</h2>
        <div className="flex">{renderStars(place.avgRating)}</div>
      </div>
      <div className="flex space-x-4 mt-6">
        {watchlistIds.includes(place._id) ? (
          <Button
            onClick={handleRemoveFromWatchlist}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Remove from Watchlist
          </Button>
        ) : (
          <Button
            onClick={handleAddToWatchlist}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Add to Watchlist
          </Button>
        )}
        <Button
          onClick={() => router.back()}
          className="bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Back to List
        </Button>

        {isAdmin && ( // Conditionally render the edit button for admins
          <Button
            onClick={() => router.push(`/places/edit/${place._id}`)}
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Edit Place
          </Button>
        )}
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
