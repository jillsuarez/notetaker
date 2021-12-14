const req = require("express/lib/request");
const res = require("express/lib/response");
const fs = require("fs");
const router = require("express").Router();
const util = require("util");
const { v4:uuidv4} = require("uuid");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
function readNotes() {
    return readFile("db/db.json", "utf-8");
}
router.get("/api/notes",(req,res) => {
    readNotes().then(data => {
        let notes= [];
        notes = notes.concat(JSON.parse(data));
        return notes
    }).then(notes => res.json(notes)).catch(err => res.json(err));
})
router.post("/api/notes", (req, res)=> {
    var newNote = {title:req.body.title, text:req.body.text, id:uuidv4()};
    readNotes().then(data => {
        let notes= [];
        notes = notes.concat(JSON.parse(data))
        notes.push(newNote)
        return notes
    }).then(notes => {
        return writeFile("db/db.json", JSON.stringify(notes));
    }).then(response => res.send({msg: "Success"}));
})

// grab all notes filter method delete by id
// res.json(response)
module.exports = router;