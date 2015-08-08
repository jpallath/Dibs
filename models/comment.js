var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var commentSchema = new Schema();

commentSchema.add({
    author: {type:String, required: true},
    content: String,
    parent_id: String,
    upvotes: {type: Number, default: 0},
    upvotedBy: [],
    edited: { type: Date, default: Date.now },
    comments: [ commentSchema ]
})

//
// parent_type: String,

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
// module.exports.commentSchema = commentSchema;
