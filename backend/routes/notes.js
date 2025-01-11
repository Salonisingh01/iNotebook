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
    
}});


// Route 2 : Add a Note using - Post "/api/notes/fetchallnotes"-Login required--

router.post("/addnote",fetchUser,[
    body("title", "Enter a valid title ").isLength({ min: 3 }),
    body("description", "Description  must be atleast 5 characters").isLength({min: 5, }), ],async (req, res) => {

        try {

            // Log the incoming request body
            console.log('Request Body:', req.body);
            console.log('User ID:', req.user?.id);

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
      tag : tag,
      user: req.user.id,
    });

 //save the note

     const savedNote = await note.save();
     res.json(savedNote);

  } catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

  }
);

module.exports = router;
