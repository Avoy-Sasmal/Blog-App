import Note from "../models/note.model.js";

//create
// const createNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const note = await Note.create({ title, content });
//     res.status(201).json({
//       success: true ,
//       message:"note created successfully"
//     });
//   } catch (error) {
//     console.log(`note creation Error `);
//   }
// };

//get notes
const getNotes = async (req, res) => {
  try {
    // Get all notes from all users (shared notes app)
    const notes = await Note.find()
      .populate("user", "name email")
      .populate("comments.user", "name email");
    res.json({
      success: true,
      message: "fetch notes successfully",
      data: notes,
    });
  } catch (error) {
    console.log(`error in getting notes`, error);
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      error: error.message,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the parameter is a valid MongoDB ObjectId (24 characters)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    let note;

    if (isObjectId) {
      // Search by ID if it's a valid ObjectId (any user can view any note)
      note = await Note.findOne({ _id: id })
        .populate("user", "name email")
        .populate("comments.user", "name email");
    } else {
      // Search by title if it's not a valid ObjectId (any user can view any note)
      note = await Note.findOne({
        title: { $regex: id, $options: "i" },
      })
        .populate("user", "name email")
        .populate("comments.user", "name email");
    }

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (error) {
    console.log(`error while finding specific note`, error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from auth middleware
    const { title, content } = req.body;

    // Check if note exists and belongs to user
    const existingNote = await Note.findOne({
      _id: req.params.id,
      user: userId,
    });
    if (!existingNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Prepare update data
    const updateData = { title, content };

    // Handle file upload if present
    if (req.file) {
      // If there's a new file, upload it to cloudinary
      const { v2: cloudinary } = await import("cloudinary");
      const fs = await import("fs");

      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      updateData.image = result.secure_url;

      // Delete the temporary file
      fs.unlinkSync(req.file.path);
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    console.log(`error during update`, error);
    res.status(500).json({
      success: false,
      message: "Error updating note",
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from auth middleware
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    }); // Only delete if user owns the note
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(`Error during deleting note ${error}`);
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      error: error.message,
    });
  }
};

// Like or unlike a note
const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const note = await Note.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    if (!Array.isArray(note.likes)) note.likes = [];
    const alreadyLikedIndex = note.likes.findIndex(
      (likeUserId) => likeUserId.toString() === userId
    );

    if (alreadyLikedIndex >= 0) {
      note.likes.splice(alreadyLikedIndex, 1);
      await note.save();
      return res.json({ success: true, message: "Unliked", data: note });
    }

    note.likes.push(userId);
    await note.save();
    res.json({ success: true, message: "Liked", data: note });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling like",
      error: error.message,
    });
  }
};

// Add a comment
const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Comment text is required" });
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    if (!Array.isArray(note.comments)) note.comments = [];
    note.comments.push({ user: userId, text });
    await note.save();

    const populated = await Note.findById(noteId)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    res
      .status(201)
      .json({ success: true, message: "Comment added", data: populated });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding comment",
      error: error.message,
    });
  }
};

export {
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  toggleLike,
  addComment,
};
