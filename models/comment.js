var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var commentSchema = Schema({
    title: {type: String, required: true},
    author: String,
    content: String,
    category: String,
    image: String,
    parent_id: String,
    parent_type: String,
    passdown: {type:String, default: "comment"},
    edited: {type: Date, default: Date.now}
})

var Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
