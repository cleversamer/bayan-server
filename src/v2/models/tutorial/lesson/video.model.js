const mongoose = require("mongoose");
const { video: validation } = require("../../../config/models");

const clientSchema = [
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

const videoSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: validation.title.minLength,
      maxLength: validation.title.maxLength,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: validation.description.minLength,
      maxLength: validation.description.maxLength,
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

const Video = mongoose.model("Video", videoSchema);

module.exports = {
  Video,
  clientSchema,
};
