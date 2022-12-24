const mongoose = require("mongoose");

const clientSchema = [
  "_id",
  "levelId",
  "gradeId",
  "author",
  "photoURL",
  "number",
];

const SUPPORTED_SEASONS = ["1", "2", "3", "4"];

const seasonSchema = new mongoose.Schema({
  photoURL: {
    type: String,
    default: "",
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  levelId: {
    type: mongoose.Types.ObjectId,
    ref: "levels",
    required: true,
  },
  gradeId: {
    type: mongoose.Types.ObjectId,
    ref: "grades",
    required: true,
  },
  number: {
    type: String,
    enum: SUPPORTED_SEASONS,
    trim: true,
    required: true,
  },
});

const Season = mongoose.model("Season", seasonSchema);

module.exports = { Season, clientSchema, SUPPORTED_SEASONS };
