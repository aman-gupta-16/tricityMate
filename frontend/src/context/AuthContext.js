"use client";
import MountedLoading from "@/components/Loader";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  const initialIsLoggedIn =
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false;

  const [user, setUser] = useState(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      setUser(storedUser || null);
      setIsLoggedIn(!!token);
    }
    setIsMounted(true); // Set mounted to true when the component has mounted
  }, []);

  const login = (userDetails) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", userDetails.token);
      localStorage.setItem("user", JSON.stringify(userDetails));
    }
    setUser(userDetails);
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUser(null);
    setIsLoggedIn(false);
  };
  if (!isMounted) {
    // Show a placeholder component while loading
    return <MountedLoading />;
  }
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
