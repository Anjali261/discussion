


const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Optional for anonymous comments
  username: { type: String, required: false } // Store username for anonymous comments
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
