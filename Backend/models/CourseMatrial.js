import mongoose from "mongoose";
const CourseMaterialSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Reference to the Course model
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export const CourseMaterial = mongoose.model("CourseMaterial",CourseMaterialSchema);
