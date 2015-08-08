var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    commentSchema  = require('module');

var ideaSchema = Schema({
    title: {type: String, required: true},
    author: {type:String, required: true},
    content: String,
    tags: [String],
    image: String,
    comments: [],
    upvotes: {type: Number, default: 0},
    upvotedBy: [],
    passdown: {type: String, default: "idea"},
    created: {type: Date, default: Date.now}
})

var Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
