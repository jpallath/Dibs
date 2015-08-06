var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    commentSchema  = require('module');

var ideaSchema = Schema({
    title: {type: String, required: true},
    author: String,
    content: String,
    tags: [String],
    image: String,
    comments: [],
    passdown: {type: String, default: "idea"},
    created: {type: Date, default: Date.now}
})

var Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
