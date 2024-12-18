// courseModel.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  courseCode: {
    type: String,
    required: false,
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  instructor: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
