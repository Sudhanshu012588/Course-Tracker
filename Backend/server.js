import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import Course from "./models/courseModel.js";
import {CourseMaterial} from "./models/CourseMatrial.js"; // Create this model for storing uploaded files

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/user/teacher", userRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });

// Fetch courses taught by a specific teacher
app.post("/api/user/teacher/teachercourses", async (req, res) => {
  const { teacherName } = req.body;
  try {
    const courses = await Course.find({ instructor: teacherName });
    if (!courses.length) {
      return res.status(404).json({ message: "No courses found for this teacher." });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

// Fetch all courses
app.post("/Allcourse", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

// Upload course material and save details in the database
app.post("/uploadCourseMaterial", upload.single("file"), async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    return res.status(400).json({ message: "Course ID is required" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const courseMaterial = new CourseMaterial({
      courseId,
      fileName: req.file.filename,
      filePath: req.file.path,
    });

    await courseMaterial.save();
    res.status(200).json({
      message: "File uploaded successfully",
      material: courseMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error: error.message });
  }
});

// Endpoint 2: Fetch all materials for all courses
// app.get("/api/materials", async (req, res) => {
//   try {
//     const materials = await CourseMaterial.find({});
//     if (!materials.length) {
//       return res.status(404).json({ message: "No materials found." });
//     }

//     res.status(200).json(materials);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching materials.", error });
//   }
// });

// Endpoint 3: Download a file by its unique file ID
import fs from "fs";
import archiver from "archiver";

app.get("/api/materials/download/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const files = await CourseMaterial.find({ courseId });
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found for this course." });
    }

    // Create a ZIP archive
    const archive = archiver("zip", { zlib: { level: 9 } });

    // Set response headers for file download
    res.setHeader("Content-Disposition", `attachment; filename=course_${courseId}_materials.zip`);
    res.setHeader("Content-Type", "application/zip");

    // Pipe archive data to response
    archive.pipe(res);

    // Add files to the archive
    files.forEach((file) => {
      archive.file(file.filePath, { name: file.fileName });
    });

    // Finalize the archive
    await archive.finalize();
  } catch (error) {
    console.error("Error downloading files:", error.message);
    res.status(500).json({ message: "Error downloading files.", error: error.message });
  }
});

app.post("/api/courses/register", async (req, res) => {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ message: "Student ID and Course ID are required." });
  }

  try {
    // Check if the course exists
    const course = await Course.find({courseCode:courseId});
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    
    // Register the student for the course
    const registration = new StudentCourse({
      studentId,
      courseId,
      registeredAt: new Date(),
    });

    await registration.save();

    res.status(201).json({ message: "Course registered successfully!", registration });
  } catch (error) {
    res.status(500).json({ message: "Error registering course.", error: error.message });
  }
});

// Endpoint to fetch course progress for a student
// app.get("/api/courses/:courseId/progress", async (req, res) => {
//   const { courseId } = req.params;

//   try {
//     const progress = await CourseProgress.findOne({ courseId });
//     if (!progress) {
//       return res.status(404).json({ message: "Progress not found for this course" });
//     }

//     res.status(200).json(progress);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching progress", error });
//   }
// });



// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
