import express from "express";
import { registerUser, loginUser, CreateCourse,getTeacherCourses } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/createcourse',CreateCourse);
// router.get('/teachercourses', getTeacherCourses);
// router.post('/teachercourses', getTeacherCourses);

export default router;