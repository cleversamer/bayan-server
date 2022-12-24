const mongoose = require("mongoose");

const clientSchema = [
  "_id",
  "author",
  "price",
  "months",
  "levelId",
  "gradeId",
  "seasonId",
  "numOfSubjects",
];

const packageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  price: {
    type: String,
    trim: true,
    required: true,
  },
  months: {
    type: String,
    trim: true,
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
  numOfSubjects: {
    type: String,
    default: "1",
    required: true,
  },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = { Package, clientSchema };
