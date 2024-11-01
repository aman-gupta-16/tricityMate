"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/utils/api"; // Axios or API client
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn for the button
import Header from "@/components/Header";

const EditPlace = ({ params }) => {
  const [place, setPlace] = useState(null);
  const router = useRouter();
  const placeId = params.id;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await api.get(`/places/${placeId}`);
        setPlace(response.data);
      } catch (error) {
        toast.error("Failed to fetch place details");
        console.error(error);
      }
    };
    fetchPlace();
  }, [placeId]);

  const handleUpdatePlace = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // Use FormData for file uploads
    formData.append("placeId", placeId);

    try {
      const response = await api.put(`/places/${placeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Place updated successfully");
        router.push(`/places/${placeId}`);
      } else {
        throw new Error("Failed to update place");
      }
    } catch (error) {
      toast.error("Error updating place");
      console.error("Error: ", error);
    }
  };

  if (!place) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Edit Place: {place.name}
          </h1>
          <form
            onSubmit={handleUpdatePlace}
            className="space-y-6 bg-gray-800 border-gray-700 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 p-6"
          >
            {/* Place Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-100"
              >
                Place Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={place.name}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-100"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                defaultValue={place.description}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-100"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={place.location}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-100"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                defaultValue={place.category}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
              />
            </div>

            {/* Entry Fee */}
            <div>
              <label
                htmlFor="entryFee"
                className="block text-sm font-medium text-gray-100"
              >
                Entry Fee
              </label>
              <input
                type="number"
                id="entryFee"
                name="entryFee"
                defaultValue={place.entryFee}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Update Place
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPlace;
