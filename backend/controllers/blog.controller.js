import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config()

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
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const blog = await Note.create({ title, content, image: imageUrl });
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.log(`Error while creating note ${error}`);
  }
};

export { createNote };
