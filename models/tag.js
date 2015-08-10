var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    tagSchema  = require('module');

var tagSchema = Schema({
    tag: {type: String, required: true},
    created: {type: Date, default: Date.now}
})

var Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
