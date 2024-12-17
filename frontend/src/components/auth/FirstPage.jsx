import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function FirstPage() {
  return (
    <>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md ">
          <h2 className=" ml-32 text-white text-2xl font-bold mb-4">Welcome</h2>
          <div className='flex justify-center items-center'>

          <Link
            to="/login" // Navigate to /login route
            className="mt-3 ml-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
            Login
          </Link>
          <Link
            to="/signup" // Navigate to /signup route
            className="mt-3 ml-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
            Signup
          </Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
