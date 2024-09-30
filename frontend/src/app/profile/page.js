"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/api"; // Axios setup with token interceptor
import { USER_END_POINT, WATCHLIST_END_POINT } from "@/lib/constant";
import { Card } from "@/components/ui/card"; // Example import for UI components
import { Button } from "@/components/ui/button"; // Example import for UI components
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.back();
      return;
    } else {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const { data: user } = await axios.get(`${USER_END_POINT}/profile`);
          setUserData(user);

          // Fetch user's watchlist
          const watchlistResponse = await axios.get(`${WATCHLIST_END_POINT}`);
          setPlaces(watchlistResponse.data);
        } catch (error) {
          setError("Error fetching user data");
          console.error("Error fetching user data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, []);

  const handleViewDetails = (id) => {
    // Redirect to the details page for the specific place
    router.push(`/places/${id}`);
  };

  // Function to render stars based on average rating
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating); // Round to nearest whole number

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="mt-2">Welcome, {userData.name}</p>
      )}

      <h2 className="mt-6 text-xl font-semibold">Your Watchlist</h2>
      {places.length > 0 ? (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Explore Places
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place) => (
              <Card
                key={place._id}
                className="p-4 shadow-md rounded-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={place.images}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded-md"
                />{" "}
                {/* Adjust image URL accordingly */}
                <h2 className="text-xl font-semibold mt-2">{place.name}</h2>
                <p className="text-gray-600 mt-2">{place.description}</p>
                <div className="mt-1">{renderStars(place.avgRating)}</div>{" "}
                {/* Display average rating as stars */}
                <Button
                  onClick={() => handleViewDetails(place._id)}
                  className="mt-4 bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p>No places in your watchlist.</p>
      )}
    </div>
  );
};

export default DashboardPage;
