const mongoose = require("mongoose");
const { document: validation } = require("../../../config/models");

const clientSchema = [
  "_id",
  "title",
  "fileURL",
  "authorId",
  "schoolId",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "unitId",
  "lessonId",
];

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: validation.title.minLength,
      maxLength: validation.title.maxLength,
    },
    fileURL: {
      type: String,
      required: true,
      trim: true,
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
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = {
  Document,
  clientSchema,
};
