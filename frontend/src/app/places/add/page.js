"use client";
import React, { useState } from "react";
import axios from "@/utils/api"; // Axios setup with token interceptor
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PLACES_END_POINT } from "@/lib/constant";

const AddPlace = () => {
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
    files.forEach((file) => {
      data.append("files[]", file); // Use files[] to match the multer configuration
    });

    try {
      const response = await axios.post(`${PLACES_END_POINT}/add`, data);
      console.log("Place added successfully:", response.data);
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add a New Place</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="entryFee">Entry Fee</Label>
                <Input
                  type="text"
                  name="entryFee"
                  id="entryFee"
                  value={formData.entryFee}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openingHours">Opening Hours</Label>
                  <Input
                    type="text"
                    name="openingHours"
                    id="openingHours"
                    value={formData.openingHours}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="closingHours">Closing Hours</Label>
                  <Input
                    type="text"
                    name="closingHours"
                    id="closingHours"
                    value={formData.closingHours}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="daysOfOperation">Days of Operation</Label>
                <Input
                  type="text"
                  name="daysOfOperation"
                  id="daysOfOperation"
                  value={formData.daysOfOperation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="files">Upload Images</Label>
                <Input
                  type="file"
                  name="files"
                  id="files"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple // Allow multiple file selection
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Add Place</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddPlace;
