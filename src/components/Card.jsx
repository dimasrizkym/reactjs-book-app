import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 dark:bg-gray-700">
      {children}
    </div>
  );
};

export default Card;
