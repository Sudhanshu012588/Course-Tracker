import User from "../models/userModel.js";
import Teacher from "../models/teacherModel.js"; // Import Teacher model
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Course from "../models/courseModel.js";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const registerUser = async (req, res) => {
  const { username, email, password, usertype } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (usertype === "teacher") {
      const teacherData = { username, email, password, usertype };
      const hashedPassword = await bcrypt.hash(password, 10);
      teacherData.password = hashedPassword;
      const teacher = await Teacher.create(teacherData);

      if (teacher) {
        res.status(201).json({
          _id: teacher.id,
          username: teacher.username,
          email: teacher.email,
          usertype: teacher.usertype,
          token: generateToken(teacher.id),
        });
      } else {
        res.status(400).json({ message: "Invalid teacher data" });
      }
    } else {
      const user = await User.create({ username, email, password, usertype });
      if (user) {
        res.status(201).json({
          _id: user.id,
          username: user.username,
          email: user.email,
          usertype: user.usertype,
          token: generateToken(user.id),
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, usertype } = req.body;

  try {
    let user;
    if (usertype === "teacher") {
      user = await Teacher.findOne({ email });
    } else {
      user = await User.findOne({ email, usertype });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        usertype: user.usertype,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const CreateCourse = async (req, res) => {
  const { courseName, courseCode, description, credits, instructor } = req.body;

  try {
    // Check for existing course
    const existingCourse = await Course.findOne({ courseCode });

    if (existingCourse) {
      return res.status(400).json({ message: `Course with code ${courseCode} already exists.` });
    }

    // Create new course
    const newCourse = new Course({
      courseName,
      courseCode,
      description,
      credits,
      instructor
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const {instructor}=req.body;
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

