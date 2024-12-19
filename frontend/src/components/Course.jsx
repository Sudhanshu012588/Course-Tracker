import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const [coursename, setCoursename] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState("");
  const [instructor, setInstructor] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data
    const courseData = {
      courseName: coursename,
      courseCode,
      description,
      credits,
      instructor,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/users/createcourse", courseData);
      console.log("Course created:", response.data);
      alert("Your course is created");
      // Handle success (e.g., redirect, reset form, display success message)
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Course Name"
          value={coursename}
          onChange={(e) => setCoursename(e.target.value)}
          className="w-full p-2 mb-2 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full p-2 mb-2 rounded text-black"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 rounded text-black"
          required
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          className="w-full p-2 mb-2 rounded text-black"
          required
        />
        <input
          type="text"
          placeholder="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          className="w-full p-2 mb-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </form>
      <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={()=>navigate("/coursecard")}
        >
          Back
        </button>
    </div>
  );
};

export default Course;
