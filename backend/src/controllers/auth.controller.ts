import express from "express";
import userModel from "../models/user.model";
import { generateToken } from "../lib/utils";
import cloudinary from "../lib/cloudinary";
export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const newUser = new userModel({ fullName, email, password });

    if (newUser) {
      const token = generateToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        message: "User created successfully",
        userId: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        jwt: token,
      });
    } else {
      res.status(400).json({ message: "Error in signup" });
      return;
    }
  } catch (error) {
    console.log("Error in signup", error);
    res.status(500).json({ message: "Error in signup" });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (user?.password !== password) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    generateToken(user?._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      userId: user?._id,
      fullName: user?.fullName,
      email: user?.email,
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({ message: "Error in login" });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout", error);
    res.status(400).json({ message: "Error in logout user" });
  }
};


export const updateProfile = async (req: express.Request, res: express.Response) => {
    try {
      const {profilePic} = req.body;
      const userId = req.user._id
   
      if(!profilePic){
        res.status(400).json({message:"Profile pic is required"})
        return  
      }

      const uploadResult = await cloudinary.uploader.upload(profilePic)
      const updatedUser = await userModel.findByIdAndUpdate(userId,{
        profilePic: uploadResult.secure_url
      },{
        new: true
      })

      res.status(200).json(updatedUser)
      


    } catch (error) {
      console.log("errorr in updating profile",error)
      res.status(500).json({message:"Error in updating profile"})   
    }
}