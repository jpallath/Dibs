var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var ideaSchema = Schema({
    title: {type: String, required: true},
    author: String,
    content: String,
    tags: String,
    image: String,
    edited: {type: Date, default: Date.now}
})

var Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
