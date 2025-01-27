const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all Notes using -Get "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 : Add a Note using - Post "/api/notes/fetchallnotes"-Login required--

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title ").isLength({ min: 3 }),
    body("description", "Description  must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Log the incoming request body
      console.log("Request Body:", req.body);
      console.log("User ID:", req.user?.id);

      const { title, description, tag } = req.body;

      //if there are errors, return Bad request and the errors---
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //create a new note
      const note = new Notes({
        title,
        description,
        tag: tag,
        user: req.user.id,
      });

      //save the note

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3 : Update an Existing Note: put "/api/notes/updatenote" .Login Required
router.put("/updatenote/:id ", fetchUser, async (req, res) => {
  
  const { title, description, tag } = req.body;

  // Create a newNote object with fields to update
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Find the note to be updated
  let notes = await Notes.findById(req.params.id);

  // If note doesn't exist, return 404
  if (!notes) {
    console.log("Note not found with ID:", req.params.id);
    return res.status(404).send("Not Found");
  }

  // Verify user owns this note
  if (notes.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
   
  // Update the note
  notes = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  res.json({ notes });

});



//Route 4 :Deleting  a existing Note using DELETE "/api/notes/deletenotes"-Login required--
router.delete('/deletenotes/:id',fetchUser, async (req,res)=>{
  
    const { title, description, tag } = req.body;
  
  
  
    // Find the note  to be Deleted 
    let notes = await Notes.findById(req.params.id);
    // If note doesn't exist, return 404
    if (!notes) {
      console.log("Note not found with ID:", req.params.id);
      return res.status(404).send("Not Found");
    }
  

    // Verify user owns this note
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
     
    // Update the note
    notes = await Notes.findByIdAndDelete(req.params.id);
  
    res.json({ "success":"Note has been deleted",notes:notes }); 

  })

module.exports = router;
