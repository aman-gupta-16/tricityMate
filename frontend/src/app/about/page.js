"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Star, Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const About = () => {
  const router = useRouter();
  const features = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-400" />,
      title: "Location Tracking",
      description:
        "Find tourist spots with precise location tracking and mapping.",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Community Reviews",
      description:
        "Real feedback from real travelers to help you make better decisions.",
    },
    {
      icon: <Star className="w-6 h-6 text-blue-400" />,
      title: "Personalized Recommendations",
      description: "Get suggestions based on your preferences and interests.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-400" />,
      title: "Event Updates",
      description: "Stay updated with local events and festivities.",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              About TricityMate
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-blue-400">TricityMate</span>,
              your ultimate companion for exploring the vibrant Tricity region.
              We're dedicated to transforming your travel experience through
              comprehensive, reliable information about the best tourist
              destinations.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 bg-gray-800 border-gray-700"
              >
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Information Tabs */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="about" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-gray-700"
              >
                About Us
              </TabsTrigger>
              <TabsTrigger
                value="mission"
                className="data-[state=active]:bg-gray-700"
              >
                Our Mission
              </TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <p className="text-lg text-gray-300">
                    TricityMate is designed by local experts who understand the
                    essence of Tricity's charm. Our platform combines local
                    knowledge with modern technology to provide you with the
                    most authentic travel experience.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="mission" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <p className="text-lg text-gray-300">
                    Our mission is to make travel planning effortless and
                    enjoyable. We strive to showcase the best of Tricity while
                    helping travelers create unforgettable memories through
                    personalized recommendations and authentic insights.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-100">
              Ready to Start Exploring?
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Join thousands of travelers who have discovered the beauty of
              Tricity through our platform.
            </p>
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push("/")}
              >
                Start Exploring
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 hover:bg-gray-800"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-12 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-gray-400">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">100+</div>
              <div className="text-gray-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">4.8</div>
              <div className="text-gray-400">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
