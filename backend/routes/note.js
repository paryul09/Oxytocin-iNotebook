const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE1: get all the notes using:GET "/api/notes/fetchallnotes" and require login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

//ROUTE2: create a user using:POST "/api/notes/addnote" and require login
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag, typ} = req.body;
      //checking for errors if there are errors return bad requests and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        typ,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
  }
);

//ROUTE3: update an existing node using:PUT "/api/notes/updatenote" and require login
router.put("/updatenote/:id", fetchuser, [], async (req, res) => {
  try {
    const { title, description, tag,typ } = req.body;
    //create a new note
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
    if (tag) {
      newNote.typ = typ;
    }

    //find the note to ne updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});
//ROUTE4: delete an existing node using:PUT "/api/notes/deletenode" and require login
router.delete("/deletenode/:id", fetchuser, [], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    //allow deletion only if user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "the note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});
module.exports = router;
