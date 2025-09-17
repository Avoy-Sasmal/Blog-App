import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    content: {
      type: String,
      required: [true, "Please add content"],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
