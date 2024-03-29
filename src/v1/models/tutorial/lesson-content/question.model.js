const mongoose = require("mongoose");

const CLIENT_SCHEMA = [
  "_id",
  "author",
  "title",
  "photoURL",
  "options",
  "answer",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "unitId",
  "lessonId",
  "quizId",
];

const questionSchema = new mongoose.Schema({
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
  quizId: {
    type: mongoose.Types.ObjectId,
    ref: "quizzes",
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  photoURL: {
    type: String,
    default: "",
  },
  options: [
    {
      type: String,
    },
  ],
  answer: {
    type: String,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = { Question, CLIENT_SCHEMA };
