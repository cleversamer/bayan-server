const mongoose = require("mongoose");

const clientSchema = [
  "_id",
  "author",
  "videoURL",
  "levelId",
  "gradeId",
  "seasonId",
  "author",
  "photoURL",
  "title",
];

const subjectSchema = new mongoose.Schema(
  {
    photoURL: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false,
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
    title: {
      type: String,
      trim: true,
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
