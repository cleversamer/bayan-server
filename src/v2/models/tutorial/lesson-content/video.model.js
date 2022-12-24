const mongoose = require("mongoose");

const CLIENT_SCHEMA = [
  "_id",
  "author",
  "title",
  "url",
  "description",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "unitId",
  "lessonId",
];

const videoSchema = new mongoose.Schema({
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
  seasonId: {
    type: mongoose.Types.ObjectId,
    ref: "seasons",
    required: true,
  },
  subjectId: {
    type: mongoose.Types.ObjectId,
    ref: "subjects",
    required: true,
  },
  unitId: {
    type: mongoose.Types.ObjectId,
    ref: "units",
    required: true,
  },
  lessonId: {
    type: mongoose.Types.ObjectId,
    ref: "lessons",
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video, CLIENT_SCHEMA };
