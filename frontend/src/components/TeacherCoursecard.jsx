import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherCourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post("http://localhost:5000/Allcourse");
        setCourses(response.data);
        setFilteredCourses(response.data); // Default to all courses
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleFilter = () => {
    const filtered = courses.filter(
      (course) =>
        course.instructor.toLowerCase().includes(teacherName.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleFileUpload = async (courseId) => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);

    try {
      await axios.post("http://localhost:5000/uploadCourseMaterial", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload file.");
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter instructor name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Filter Courses
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">Filtered Courses</h1>

      {filteredCourses.length === 0 ? (
        <div className="text-center text-gray-400">No courses found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div key={course._id} className="bg-gray-800 p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">{course.courseName}</h3>
              <p className="text-gray-300">Instructor: {course.instructor}</p>
              <p className="text-gray-300">Credits: {course.credits}</p>
              <p className="text-gray-300">Description: {course.description}</p>

              {/* Upload Section */}
              <div className="mt-4">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-gray-300"
                />
                <button
                  onClick={() => handleFileUpload(course._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mt-2 rounded"
                >
                  Upload Material
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourseCard;
