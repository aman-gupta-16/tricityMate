"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/api";
import { USER_END_POINT, WATCHLIST_END_POINT } from "@/lib/constant";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Header from "@/components/Header";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [places, setPlaces] = useState([]);
  const [reviews, setReviews] = useState([]); // New state for storing reviews
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false); // Loading state for reviews
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in");
      router.replace("/login");
    } else {
      fetchUserData();
      fetchUserReviews(); // Fetch reviews on component mount
    }
  }, [user, router]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const { data: user } = await axios.get(`${USER_END_POINT}/profile`);
      setUserData(user);
      const watchlistResponse = await axios.get(`${WATCHLIST_END_POINT}`);
      setPlaces(watchlistResponse.data);
    } catch (error) {
      setError("Error fetching user data");
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  };

  // New function to fetch user reviews
  const fetchUserReviews = async () => {
    setReviewLoading(true);
    try {
      const { data: userReviews } = await axios.get(
        "http://localhost:8000/api/reviews/user"
      );
      setReviews(userReviews);
    } catch (error) {
      console.error("Error fetching user reviews", error);
    } finally {
      setReviewLoading(false);
    }
  };

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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Dashboard
            </h1>
            {loading ? (
              <div className="mt-4 text-gray-400 animate-pulse">Loading...</div>
            ) : error ? (
              <div className="mt-4 text-red-400 bg-red-900/20 p-3 rounded-lg">
                {error}
              </div>
            ) : (
              <p className="mt-4 text-gray-300 text-lg">
                Welcome,{" "}
                <span className="text-blue-400 font-semibold">
                  {userData?.name}
                </span>
              </p>
            )}
          </div>

          {/* Watchlist Section */}
          <div className="relative">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">
              Your Watchlist
            </h2>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>

          {places.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
                        {renderStars(place.averageRating)}
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
          ) : (
            <div className="mt-8 text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-400">
                Your watchlist is empty. Start exploring places to add them to
                your watchlist!
              </p>
              <Button
                onClick={() => router.push("/")}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Explore Places
              </Button>
            </div>
          )}

          {/* User Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">
              Your Reviews
            </h2>
            {reviewLoading ? (
              <div className="mt-4 text-gray-400 animate-pulse">
                Loading reviews...
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card
                    key={review._id}
                    className="bg-gray-800 p-5 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-start">
                      <img
                        src={review.place.images[0]} // Display the first image in the array
                        alt={review.place.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">
                          {review.place.name}
                        </h3>
                        <p className="text-gray-400 mt-2">{review.comment}</p>
                        <div className="mt-3">{renderStars(review.rating)}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">
                You haven't given any reviews yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
