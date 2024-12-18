import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseCard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from backend
    axios.get('http://localhost:5000/api/users/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(course => (
        <div key={course._id} className="bg-gray-800 p-4 rounded shadow-md">
          <h3 className="text-xl font-bold text-white">{course.courseName}</h3>
          <p className="text-gray-300">Instructor: {course.instructor}</p>
          <p className="text-gray-300">Credits: {course.credits}</p>
          <p className="text-gray-300">Description: {course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
