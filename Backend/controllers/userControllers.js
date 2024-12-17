import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});

};

export const registerUser = async (req, res) => {
    const { username, email, password,usertype } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
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
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
export const loginUser = async (req, res) => {
    const { email, password,usertype } = req.body;
  
    try {
      const user = await User.findOne({ email,usertype});
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user.id,
          username: user.username,
          email: user.email,
          usertype:user.usertype,
          token: generateToken(user.id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };