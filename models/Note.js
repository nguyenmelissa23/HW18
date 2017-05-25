var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    text: {
        type: String, 
        unique: true,
        require: [true,"No text input"], 
        minlength: 1
    }
    // , 

    // date: {
    //     type: String
    // }
});

var Note = mongoose.model("Note", NoteSchema);



module.exports = Note;