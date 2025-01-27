const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    googleId: { type: String, unique: true, sparse: true }, 

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
