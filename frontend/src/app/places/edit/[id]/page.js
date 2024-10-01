"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/utils/api"; // Axios or API client
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn for the button

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Edit Place: {place.name}
      </h1>
      <form onSubmit={handleUpdatePlace} className="space-y-6">
        {/* Place Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Place Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={place.name}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={place.description}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={place.location}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={place.category}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Entry Fee */}
        <div>
          <label
            htmlFor="entryFee"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Entry Fee
          </label>
          <input
            type="number"
            id="entryFee"
            name="entryFee"
            defaultValue={place.entryFee}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Images */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            className="mt-1 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Update Place
        </Button>
      </form>
    </div>
  );
};

export default EditPlace;
