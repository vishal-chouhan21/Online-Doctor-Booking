import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Register user 
export const registerUser = async (req, res) => {
  try {
    const {name, email, password, phone} = req.body;

    const exist = await User.findOne({email});
    if(exist)
      return res.json({success:false, message:"Use another email"});

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      phone
    });

    await newUser.save();

    res.json({success:true, message:"user registered"})
  } catch (error) {
    res.json({success:false, message:"something Error", error: error.message})
  }
};

//Login user
export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

  const exist = await User.findOne({email});
  if(!exist)
    return res.json({success:false, message:"user not found"})

  const isMatch = await bcrypt.compare(password, exist.password);
  if(!isMatch)
    return res.json({success:false, message:"invalid password"})

//generate jwt token
const token = jwt.sign(
  {id: exist._id},
  process.env.JWT_SECRET,
  {expiresIn: "3d"}
);
res.json({success:true, message:"Login sucessfully",
  token,
  user: {
    id: exist._id,
    name: exist.name,
    email: exist.email
  }
});
  } catch (error) {
    res.json({ success: false, message: "Somethig Error" });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({success:true, data:user});
  } catch (error) {
    res.json({ success:false, message:"something error"})
  }
};