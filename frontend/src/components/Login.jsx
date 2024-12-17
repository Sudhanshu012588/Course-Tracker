import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  
  const navigate = useNavigate(); // Move useNavigate to the top level of the component
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
        usertype,
      });
      alert("Login successful!");
      console.log(response.data);

      // Navigate to a route based on usertype
      navigate(`/${usertype}`);
    } catch (error) {
      alert("Login failed! " + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-gray-100 p-6 shadow-lg rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Student or Teacher"
          value={usertype}
          onChange={(e) => setUsertype(e.target.value.toLowerCase())}
          className="w-full p-2 mb-4 border rounded"
        />
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
