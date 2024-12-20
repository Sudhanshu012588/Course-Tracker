import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome Course Tracker</h1>
        <p className="text-lg mb-8">Join us today and start your journey!</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded transition duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
