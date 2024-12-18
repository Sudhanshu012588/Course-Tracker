import express from "express";
import { registerUser, loginUser, CreateCourse,getAllCourses } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/createcourse',CreateCourse);
router.get('/courses', getAllCourses);

export default router;