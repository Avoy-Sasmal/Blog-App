import Note from "../models/note.model.js";


//create 
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json({
      success: true , 
      message:"note created successfully"
    });
  } catch (error) {
    console.log(`note creation Error `);
  }
};


//get notes 
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({
      success: true,
      message: "fetch notes successfully",
      data : notes
    });
  } catch (error) {
   console.log(`error in getting notes`);
   
  }
};


 const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note){
      return res.status(404).json({
         message: "Note not found"
         });
    } 
    res.json({
      success: true,
      message: "This note is exist , fetch detailed  successfully",
    });
  } catch (error) {
    console.log(`error while finding specific note  `);
    
  }
};

 const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, 
    {
      new: true,
    });
    if (!note) {
      return res.status(404).json({ 
        message: "Note not found"
       });
    }
    res.json({
      success: true,
      message: "edited successfully ",
    });
  } catch (error) {
    console.log(`error durig finding `);
    
  }
};


 const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note){
       return res.status(404).json({
         message: "Note not found"
         });
    }
    res.json({ 
      success:true,
      message: "Note deleted successfully !! "
     });
  } catch (error) {
    console.log(`Error during delteing note ${error}`);
    
  }
};

export { createNote, getNotes, getNoteById, updateNote,deleteNote };
