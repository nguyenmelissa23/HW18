var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true,"No title found"], 
        minlength:1
    }, 
    
    link: {
        type: String, 
        unique: true, 
        required: [true, "No link found"],
    }, 

    notes: {
        type: Schema.Types.ObjectId, 
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;