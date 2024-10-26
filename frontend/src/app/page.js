"use client";
import { useEffect, useState } from "react";
import axios from "@/utils/api";
import { PLACES_END_POINT } from "@/lib/constant";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(PLACES_END_POINT);
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/places/${id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i <= roundedRating ? "text-yellow-400" : "text-gray-600"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Explore Places
        </h1>

        {places.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400 text-lg">
              Loading amazing places...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Card
                key={place._id}
                className="bg-gray-800 border-gray-700 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={place.images[0]}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-100 mb-2">
                    {place.name}
                  </h2>
                  <p className="text-gray-400 mb-3 line-clamp-2">
                    {place.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {renderStars(place.avgRating)}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleViewDetails(place._id)}
                    className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
