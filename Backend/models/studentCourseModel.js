import mongoose from "mongoose";

const studentCourseSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming "User" is the student model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

const StudentCourse = mongoose.model("StudentCourse", studentCourseSchema);

export default StudentCourse;
