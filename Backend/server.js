import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

//upload
app.post("/upload", upload.single("file"), async (req, res) => {
  const { originalname } = req.file;
  const filePath = req.file.path;

  const newPDF = new PDF({ name: originalname, filePath });
  await newPDF.save();

  res.json({ message: "File uploaded successfully", file: req.file });
});

//fetch
app.get("/files", async (req, res) => {
  const files = await PDF.find();
  res.json(files);
});


// API to Download a PDF
app.get("/download/:id", async (req, res) => {
  const file = await PDF.findById(req.params.id);
  if (file) {
    res.download(path.resolve(file.filePath));
  } else {
    res.status(404).json({ message: "File not found" });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
