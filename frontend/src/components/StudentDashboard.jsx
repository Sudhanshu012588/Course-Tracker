import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUsername } from "../../userSlice.js"; // Import clearUsername action

const StudentDashboard = () => {
  const newusername = useSelector((state) => state.user.username); // Fetch username from Redux store
  const username = newusername;
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const [submissionLink, setSubmissionLink] = useState("");

  // Placeholder data
  const assignments = [
    { id: 1, title: "Math Assignment 1", dueDate: "2024-08-10" },
    { id: 2, title: "Science Project", dueDate: "2024-08-15" },
  ];

  const notices = [
    { id: 1, content: "Mid-semester exams start on August 20th." },
    { id: 2, content: "Submit all assignments by their due dates." },
  ];

  const grades = [
    { id: 1, subject: "Math", grade: "A" },
    { id: 2, subject: "Science", grade: "B+" },
  ];

  // Submit assignment handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Assignment submitted: ${submissionLink}`);
    setSubmissionLink("");
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(clearUsername()); // Clear username from Redux store
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">Hello, {username}</h1>

      {/* View Assignments */}
      <div className="bg-gray-800 p-4 mb-6 rounded">
        <h2 className="text-2xl mb-3">Assignments</h2>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id} className="mb-2">
              <strong>{assignment.title}</strong> - Due: {assignment.dueDate}
            </li>
          ))}
        </ul>
      </div>

      {/* Submit Assignments */}
      <div className="bg-gray-800 p-4 mb-6 rounded">
        <h2 className="text-2xl mb-3">Submit Assignment</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Paste your assignment link here"
            value={submissionLink}
            onChange={(e) => setSubmissionLink(e.target.value)}
            className="w-full p-2 mb-2 rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>

      {/* View Notices */}
      <div className="bg-gray-800 p-4 mb-6 rounded">
        <h2 className="text-2xl mb-3">Notices</h2>
        <ul>
          {notices.map((notice) => (
            <li key={notice.id} className="mb-2">
              {notice.content}
            </li>
          ))}
        </ul>
      </div>

      {/* View Grades */}
      <div className="bg-gray-800 p-4 mb-6 rounded">
        <h2 className="text-2xl mb-3">Grades</h2>
        <ul>
          {grades.map((grade) => (
            <li key={grade.id} className="mb-2">
              <strong>{grade.subject}</strong> - Grade: {grade.grade}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
