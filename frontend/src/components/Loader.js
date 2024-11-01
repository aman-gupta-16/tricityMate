"use client";
import React from "react";

const MountedLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">tricityMate</h2>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default MountedLoading;
