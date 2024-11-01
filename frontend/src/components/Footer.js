import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Card className="bg-gradient-to-b from-gray-800 to-gray-900 text-white mt-5">
      <CardContent className="py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <CardTitle className="text-lg font-bold">tricityMate</CardTitle>
            <p className="text-gray-300">Tourist Guide Web App for Tricity</p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Explore
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <div className="flex space-x-4">
              <a
                href="https://x.com/AmanGup52727388"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/r0_aman/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/aman-gupta-50535521a/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; 2024 tricityMate. Developed by Aman Gupta.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Footer;
