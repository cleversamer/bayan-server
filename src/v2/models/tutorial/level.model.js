const mongoose = require("mongoose");

const CLIENT_SCHEMA = ["_id", "title", "author", "photoURL", "number"];

const levelSchema = new mongoose.Schema({
  photoURL: {
    type: String,
    default: "",
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Level = mongoose.model("Level", levelSchema);

module.exports = { Level, CLIENT_SCHEMA };
