import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/signup";
import Navbar from "./components/Navbar";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import Course from "./components/Course"
import MyCourses from "./components/MyCourses";
// import Coursecard from "./components/Coursecard";
import TeacherCourseCard from "./components/TeacherCoursecard";
import StudentCourseCard from "./components/StudentCoursecard";
import StudentCourseRegister from "./components/StudentCourseRegister"
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navbar />} />
        {/* <Navbar /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path='/course' element={<Course/>}/>
        <Route path='/mycourse' element={<MyCourses/>}/>
        <Route path='/teachercoursecard' element={<TeacherCourseCard/>}/>
        <Route path='/studentcoursecard' element={<StudentCourseCard/>}/>
        <Route path='/registercard' element={<StudentCourseRegister/>}/>
      </Routes>
    </Router>
  );
}

export default App;
