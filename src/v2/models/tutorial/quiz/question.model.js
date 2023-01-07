const mongoose = require("mongoose");
const { question: validation } = require("../../../config/models");

const clientSchema = [
  "_id",
  "title",
  "photoURL",
  "options",
  "answer",
  "authorId",
  "schoolId",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "unitId",
  "lessonId",
  "quizId",
];

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: validation.title.minLength,
      maxLength: validation.title.maxLength,
    },
    photoURL: {
      type: String,
      default: "",
      trim: true,
    },
    options: [
      {
        type: String,
        minLength: validation.option.minLength,
        maxLength: validation.option.maxLength,
      },
    ],
    answer: {
      type: String,
      minLength: validation.answer.minLength,
      maxLength: validation.answer.maxLength,
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolId: {
      type: mongoose.Types.ObjectId,
      ref: "School",
      required: true,
    },
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

const Question = mongoose.model("Question", questionSchema);

module.exports = {
  Question,
  clientSchema,
};
