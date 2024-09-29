"use client";
import { useEffect, useState } from "react";
import axios from "@/utils/api"; // Assuming you've set up axios with interceptors
import { PLACES_END_POINT } from "@/lib/constant";
import { Card } from "@/components/ui/card"; // Assuming you have a Card component from ShadCN
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(PLACES_END_POINT);
        setPlaces(response.data); // Assuming the response is an array of places
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
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
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Places</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <Card
            key={place._id}
            className="p-4 shadow-md rounded-lg transition-transform transform hover:scale-105"
          >
            <img
              src={place.images[0]}
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
  );
};

export default HomePage;
