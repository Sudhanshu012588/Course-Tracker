import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
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
    }
});

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

const User = mongoose.model("User",userSchema);

export default User;