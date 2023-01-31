const express = require("express");
const fs = require('fs');
const {v4} = require('uuid');
const app = express();



const router = express.Router()

let note = []

router.get("/",(req,res)=>{
    console.log("connected")
    res.send("oh Hi there type in /notes in the request")
})

// router.get("/notes", (req, res)=>{
//     console.log("connected")
//     res.send("Hello")
// })

router.get('/notes', (req, res) => {
    fs.readFile(__dirname + '/../db/db.json', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

router.post('/notes', (req, res) => {
    const newNote = {
        id: v4(),
        title: req.body.title,
        text: req.body.text 
    };
    fs.readFile(__dirname + '/../db/db.json', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(notes, null, 4), (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(newNote);
                }
            });
        }
    });
});

router.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(__dirname + '/../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error reading db.json file' });
        }
        let notes = JSON.parse(data);
        const note =  notes.filter(note => note.id == id);
        if (!note) {
            return res.status(404).send({ error: 'Note not found' });
        }
        res.send(note);
    });
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(__dirname + '/../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Error reading db.json file' });
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== id);
        fs.writeFile(__dirname + '/../db/db.json', JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Error writing to db.json file' });
            }
            res.send({ message: 'Note deleted successfully' });
        });
    });
});


module.exports = router