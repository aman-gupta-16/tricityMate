"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import { useRouter } from "next/navigation";
import axios from "axios";

const Header = ({ setSearchResults, searchResults }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    router.push("/");
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://tricitymate-backend-g6gc.onrender.com/api/places/search?q=${searchQuery}`
      );
      setSearchTriggered(false);
      setSearchResults(response.data); // Pass search results to parent component or state
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchTriggered) {
      handleSearch();
    }
  }, [searchTriggered]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  const ProfileMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.avatar || "https://github.com/shadcn.png"}
            alt={user?.name || "User Avatar"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link href="/profile">
            <span>Your Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <User className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              TricityMate
            </Link>
          </div>

          {/* Search Bar - Always visible */}
          <div className="flex-grow max-w-xs sm:max-w-md mx-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer"
                onClick={() => {
                  setSearchTriggered(true); // Set trigger to true on button click
                }}
              ></Search>

              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent default form submission
                    setSearchTriggered(true); // Set trigger to true
                  }
                }}
                placeholder="Search..."
                className="pl-10 w-full bg-slate-800 text-white border-slate-700 rounded-full focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            {/* Show "Add Places" button if the user is an admin */}
            {isLoggedIn && user?.role === "admin" && (
              <Link href="/places/add">
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Add Places
                </Button>
              </Link>
            )}
            {isLoggedIn ? (
              <ProfileMenu />
            ) : (
              <>
                <Link href="/login">
                  <Button className="hover:bg-slate-700">Sign In</Button>
                </Link>

                <Link href="/register">
                  <Button className="bg-slate-700 text-white hover:bg-slate-600">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn && user?.role === "admin" && (
              <Link
                href="/places/add"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
              >
                Add Places
              </Link>
            )}
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700"
                >
                  Your Profile
                </Link>
                <Button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-900 hover:bg-slate-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="mt-4 space-y-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full text-white hover:bg-slate-700"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-slate-700 text-white hover:bg-slate-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
