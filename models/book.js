var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("books",bookSchema);