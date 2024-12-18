import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setUsername } from "../../userSlice.js"; // Import the action from Redux slice

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsernameInput] = useState(""); // Use setUsernameInput to avoid conflict with Redux action

  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !usertype) {
      setError("Please fill in all fields.");
      return;
    }

    if (!["student", "teacher"].includes(usertype)) {
      setError("Usertype must be either 'student' or 'teacher'.");
      return;
    }

    try {
      setError(null); // Clear previous errors
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
        usertype,
      });
      

      alert("Login successful!");
      console.log("Login Response:", response.data);

      // Dispatch the username to the Redux store
      dispatch(setUsername(username));

      // Navigate to a route based on usertype
      navigate(`/${usertype}`);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-gray-100 p-6 shadow-lg rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Display error messages */}
        {error && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="usertype" className="block text-gray-700 mb-1">
            Usertype
          </label>
          <input
            id="usertype"
            type="text"
            placeholder="Student or Teacher"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value.toLowerCase())}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
