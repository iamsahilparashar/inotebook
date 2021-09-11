const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// route 1:  fetch all notes from database gett ./fetchallnotes 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
})

// route 2:  add notes to database post ./addnote  login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description have more than 5 character').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await notes.save();
        res.json(savedNote);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
})

//route 3 : update a existing notes
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description have more than 5 character').isLength({ min: 5 }),
], async (req, res) => {
    const {title, description, tag} = req.body;

    //create a newNote obj;
    const newNote = {};
    if(title){newNote.title = title;}
    if(description){newNote.description = description;}
    if(tag){newNote.tag = tag;}

    // find the Note to be updated and update it

    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    
    if(note.user.toString() != req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new : true});
    res.json(note);

})

module.exports = router