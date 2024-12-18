// teacherModel.js
import mongoose from 'mongoose';
import Course from './courseModel.js';
const { Schema } = mongoose;

const teacherSchema = new Schema({
    username:{
        type:String,
        require:[true, "username is required"],
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique: true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    token:{
        type:String
    },
    usertype:{
        type:String,
        lowercase:true,     
    },
    courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course',
        }
      ],
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
