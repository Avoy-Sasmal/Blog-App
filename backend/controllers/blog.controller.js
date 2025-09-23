import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import Note from "../models/note.model.js";

//cloudinary congif

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create blog
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Get user ID from auth middleware
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const blog = await Note.create({
      title,
      content,
      image: imageUrl,
      user: userId, // Associate note with user
    });
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: blog,
    });
  } catch (error) {
    console.log(`Error while creating note ${error}`);
    res.status(500).json({
      success: false,
      message: "Error creating note",
      error: error.message,
    });
  }
};

export { createNote };
