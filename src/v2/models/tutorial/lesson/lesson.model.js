const mongoose = require("mongoose");
const { lesson: validation } = require("../../../config/models");

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
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: validation.title.minLength,
      maxLength: validation.title.maxLength,
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
    videoId: {
      type: mongoose.Types.ObjectId,
      ref: "Video",
      default: "",
    },
    documentId: {
      type: mongoose.Types.ObjectId,
      ref: "Document",
      default: "",
    },
    quizId: {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
      default: "",
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

// Create an index on the `unitId` field to enhance
// get unit's lessons query
lessonSchema.index({ unitId: 1 });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = {
  Lesson,
  clientSchema,
};
