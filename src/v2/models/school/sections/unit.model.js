const mongoose = require("mongoose");
const { unit: validation } = require("../../../config/models");

const clientSchema = [
  "_id",
  "levelId",
  "gradeId",
  "seasonId",
  "subjectId",
  "author",
  "title",
];

const unitSchema = new mongoose.Schema(
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
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: validation.title.minLength,
      maxLength: validation.title.maxLength,
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

// Create an index on the `subjectId` field to enhance
// get subject's units query
unitSchema.index({ subjectId: 1 });

const Unit = mongoose.model("Unit", unitSchema);

module.exports = {
  Unit,
  clientSchema,
};
