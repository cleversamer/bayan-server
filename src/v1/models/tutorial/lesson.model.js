const mongoose = require("mongoose");

const clientSchema = [
  "_id",
  "title",
  "author",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "unitId",
  "videoId",
  "documentId",
  "quizId",
];

const lessonSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
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
    videoId: {
      type: Object,
      ref: "videos",
      default: "",
    },
    documentId: {
      type: Object,
      ref: "documents",
      default: "",
    },
    quizId: {
      type: Object,
      ref: "quizzes",
      default: "",
    },
  },
  { minimize: false }
);

// Create an index on the `unitId` field to enhance
// get unit's lessons query
lessonSchema.index({ unitId: 1 });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson, clientSchema };
