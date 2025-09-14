import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        The page you are looking for does not exist or you do not have access.
      </p>
      <Link
        to="/"
        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
