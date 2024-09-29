"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/api"; // Axios setup with token interceptor
import { USER_END_POINT, WATCHLIST_END_POINT } from "@/lib/constant";
import { Card } from "@/components/ui/card"; // Example import for UI components
import { Button } from "@/components/ui/button"; // Example import for UI components

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <div
              key={place._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={place.imageUrl}
                alt={place.name}
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold">{place.name}</h3>
              <p className="text-gray-600">{place.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No places in your watchlist.</p>
      )}
    </div>
  );
};

export default DashboardPage;
