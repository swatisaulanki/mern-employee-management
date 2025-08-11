import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center md:h-[650px] bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8  max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to the Admin Panel
        </h1>
        <p className="text-gray-600">
          Manage employees, track data, and keep your organization running
          smoothly.
        </p>
      </div>
    </div>
  );
};

export default Home;
