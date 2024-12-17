import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!(usertype.toLowerCase()=='teacher'||usertype.toLowerCase()=='student')){
      alert('Role can be of student and teacher only')

    }
    else{

      try {
        const response = await axios.post("http://localhost:5000/api/users/register", {
          username,
          email,
          password,
          usertype,
        });
        alert("Signup successful!");
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || "Signup failed! Try again.");
          console.error("Error Response:", error.response.data);
        } else {
          alert("Network error! Please check the server.");
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSignup} className="max-w-md mx-auto bg-gray-100 p-6 shadow-lg rounded">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
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
        <label htmlFor="usertype" className="block text-gray-700 text-sm mb-2">Role</label>
        <input
          type="text"
          placeholder="Student or Teacher"
          value={usertype}
          onChange={(e) => setUsertype(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
