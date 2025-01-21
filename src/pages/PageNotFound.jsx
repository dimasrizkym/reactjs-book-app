import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto p-6 flex flex-col items-center justify-center h-screen">
        <h1 className="text-8xl font-semibold mb-4 text-gray-900 dark:text-white">
          404
        </h1>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
          Page Not Found
        </h1>
        <Link
          to={"/"}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
