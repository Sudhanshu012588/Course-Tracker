import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUsername } from "../../userSlice.js";

const TeacherDashboard = () => {
  const newusername = useSelector((state) => state.user.username); // Fetch username from Redux store
  const username = newusername;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courses, setCourses] = useState({
    courseName:"",
    courseCode:"",
    credits:"",
    instructor:"",
    description:""
  });

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/user/teacher/${username}`);
  //       setCourses(response.data);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchCourses();
  // }, [username]); 

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">{`${username}`}</h1>
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded mt-4 mr-4" onClick={() => navigate('/course')}>
        Create Course
      </button>
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded mt-4" onClick={() => navigate('/teachercoursecard')}>
        My Courses
      </button>
      {/* Render Courses */}
      {/* {courses.length > 0 ? (
        <div className="grid gap-4 mt-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-gray-800 p-4 rounded shadow-md">
              <h2 className="text-2xl font-bold mb-2">{course.courseName}</h2>
              <p className="mb-1">Course Code: {course.courseCode}</p>
              <p className="mb-1">Credits: {course.credits}</p>
              <p className="mb-1">Instructor: {course.instructor}</p>
              <p className="mb-1">Description: {course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found for this instructor.</p>
      )} */}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded mt-6 block"
      >
        Logout
      </button>
    </div>
  );
};

export default TeacherDashboard;
