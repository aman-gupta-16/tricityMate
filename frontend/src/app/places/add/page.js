"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/api"; // Axios setup with token interceptor
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PLACES_END_POINT } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";

const AddPlace = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/login");
      toast.error("unauthorized user");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    entryFee: "",
    openingHours: "",
    closingHours: "",
    daysOfOperation: "",
  });
  const [files, setFiles] = useState([]); // Change to array for multiple files

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Use the spread operator to create an array of files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Prepare form data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("entryFee", formData.entryFee);
    data.append("openingHours", formData.openingHours);
    data.append("closingHours", formData.closingHours);
    data.append("daysOfOperation", formData.daysOfOperation);

    // Append all files to FormData
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    try {
      const response = await axios.post(`${PLACES_END_POINT}/add`, data);
      setLoading(false); // End loading
      router.push("/");
      toast.success("Place added successfully!"); // Success toast
    } catch (error) {
      setLoading(false); // End loading on error
      toast.error("Error adding place!"); // Error toast
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
        <div className="max-w-xl mx-auto mt-10">
          <Card className="bg-gray-800 border-gray-700 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Add a New Place
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-100">
                      Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-100">
                      Description
                    </Label>
                    <Textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-gray-100">
                      Category
                    </Label>
                    <Input
                      type="text"
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-gray-100">
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="entryFee" className="text-gray-100">
                      Entry Fee
                    </Label>
                    <Input
                      type="text"
                      name="entryFee"
                      id="entryFee"
                      value={formData.entryFee}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="openingHours" className="text-gray-100">
                        Opening Hours
                      </Label>
                      <Input
                        type="text"
                        name="openingHours"
                        id="openingHours"
                        value={formData.openingHours}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="closingHours" className="text-gray-100">
                        Closing Hours
                      </Label>
                      <Input
                        type="text"
                        name="closingHours"
                        id="closingHours"
                        value={formData.closingHours}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="daysOfOperation" className="text-gray-100">
                      Days of Operation
                    </Label>
                    <Input
                      type="text"
                      name="daysOfOperation"
                      id="daysOfOperation"
                      value={formData.daysOfOperation}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="files" className="text-gray-100">
                      Upload Images
                    </Label>
                    <Input
                      type="file"
                      name="files"
                      id="files"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-gray-100"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                {loading ? "Adding Place..." : "Add Place"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddPlace;
