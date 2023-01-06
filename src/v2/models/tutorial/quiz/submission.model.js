const mongoose = require("mongoose");

const clientSchema = [
  "author",
  "date",
  "answers",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "unitId",
  "lessonId",
  "quizId",
];

const submissionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
      ref: "Level",
      required: true,
    },
    gradeId: {
      type: mongoose.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
    seasonId: {
      type: mongoose.Types.ObjectId,
      ref: "Season",
      required: true,
    },
    subjectId: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    unitId: {
      type: mongoose.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    lessonId: {
      type: mongoose.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    quizId: {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = {
  Submission,
  clientSchema,
};
