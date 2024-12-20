# Course Management System

This project is a Course Management System built using the MERN stack (MongoDB, Express, React, Node.js). It provides functionalities for students and teachers to manage courses, upload/download course materials, and track course progress.

---

## Features

### **Student Functionality**

1. **View All Courses**
   - Students can view a list courses.
   - Includes course details such as:
     - Course Name
     - Instructor Name
     - Credits
     - Course Description

2. **Filter Courses by Instructor**
   - Students can filter courses by entering the instructor's name.

3. **Download Course Materials**
   - Students can view all uploaded files for a specific course.
   

---

### **Teacher Functionality**

1. **Upload Course Materials**
   - Teachers can upload course materials for a specific course.
   - Uploaded files include metadata such as:
     - File Name
     - File Path

2. **Fetch All Files for a Course**
   - Teachers can view all uploaded files for their courses.

---

## API Endpoints

### **General Endpoints**
- `GET /`  
  Returns a welcome message indicating the API is running.

### **Course Endpoints**

1. **Fetch All Courses**
   - `POST /Allcourse`
   - Returns a list of all available courses.

2. **Fetch Files for a Course**
   - `GET /api/courses/:courseId/files`
   - Retrieves all uploaded files for a specific course.

3. **Download a File**
   - `GET /api/courses/:courseId/files/:fileId`


### **Teacher Endpoints**

1. **Upload Course Material**
   - `POST /api/courses/:courseId/upload`
   - Allows teachers to upload course materials for a specific course.

2. **Fetch Teacher-Specific Courses**
   - `POST /api/user/teacher/teachercourses`
   - Retrieves a list of courses taught by a specific instructor.

---

## Models

### **Course Model**
Fields include:
- `courseName`
- `instructor`
- `credits`
- `description`

### **Course Material Model**
Fields include:
- `courseId`
- `fileName`
- `filePath`


---

## Tools and Technologies

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Upload**: Multer

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/https://github.com/Sudhanshu012588/Course-Tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd course-management-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     MONGO_URI=your_mongo_db_connection_string
     PORT=5000
     ```

5. Start the server:
   ```bash
   npm start
   ```

---

## Folder Structure

- `models/`
  - Contains Mongoose models for courses, course materials, and course progress.
- `routes/`
  - Includes user routes for handling API requests.
- `uploads/`
  - Directory for storing uploaded course materials.
- `config/db.js`
  - MongoDB connection configuration.

---

## Future Enhancements

- Add authentication and authorization for students and teachers.
- Enhance course progress tracking.

---

## License
This project is licensed under the MIT License.
