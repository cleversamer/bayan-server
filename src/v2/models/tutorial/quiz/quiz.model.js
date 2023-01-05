const mongoose = require("mongoose");

const CLIENT_SCHEMA = [
  "_id",
  "author",
  "title",
  "questions",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "unitId",
  "lessonId",
];

const quizSchema = new mongoose.Schema(
  {
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
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "questions",
      },
    ],
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = {
  Quiz,
  CLIENT_SCHEMA,
};
