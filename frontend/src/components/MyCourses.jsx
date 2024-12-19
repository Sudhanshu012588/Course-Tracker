import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [teacherName, setteacherName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    try {
      // Send teacher username to the server
      const response = await axios.post(
        "http://localhost:5000/api/user/teacher/teachercourses",
        { teacherName }
      );
        console.log(response)
      // Save teacher data or token in localStorage/sessionStorage
      sessionStorage.setItem("teacherUsername", teacherName);

      // Redirect to CourseCard
      navigate("/coursecard");
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Enter details</h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={teacherName}
            onChange={(e) => setteacherName(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyCourses;
