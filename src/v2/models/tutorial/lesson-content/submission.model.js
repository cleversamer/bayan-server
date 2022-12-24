const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    default: new Date(),
  },
  answers: [
    {
      type: String,
    },
  ],
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
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = {
  Submission,
};
