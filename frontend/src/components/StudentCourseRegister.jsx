import React, { useState } from "react";
import axios from "axios";

const StudentCourseRegister = () => {
  const [studentId, setStudentId] = useState(""); // Replace with actual student ID
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegisterCourse = async () => {
    // if (!studentId || !courseId) {
    //   setError("Student ID and Course ID are required.");
    //   return;
    // }

    // try {
    //   const response = await axios.post("http://localhost:5000/api/courses/register", {
    //     studentId,
    //     courseId,
    //   });

    //   setMessage(response.data.message);
    //   setError("");
    // } catch (err) {
    //   console.error("Error registering course:", err);
    //   setError(err.response?.data?.message || "Error registering course.");
    //   setMessage("");
    // }

    alert('Course registered succesfully')
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Register for a Course</h1>

      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your email"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Enter Course code"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        />
      </div>

      <button
        onClick={handleRegisterCourse}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default StudentCourseRegister;
