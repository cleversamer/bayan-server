const mongoose = require("mongoose");
const { subject: validation } = require("../../../config/models");

const clientSchema = [
  "_id",
  "photoURL",
  "videoURL",
  "title",
  "authorId",
  "schoolId",
  "levelId",
  "gradeId",
  "seasonId",
];

const subjectSchema = new mongoose.Schema(
  {
    photoURL: {
      type: String,
      default: "",
      trim: true,
    },
    videoURL: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: validation.title.minLength,
      maxLength: validation.title.maxLength,
    },
    isFree: {
      type: Boolean,
      default: false,
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
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);

// Create an index on the `seasonId` field to enhance
// get seasonId's subjects query
subjectSchema.index({ seasonId: 1 });

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = {
  Subject,
  clientSchema,
};
