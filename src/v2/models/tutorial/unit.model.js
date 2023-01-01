const mongoose = require("mongoose");

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
    title: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { minimize: false }
);

// Create an index on the `subjectId` field to enhance
// get subject's units query
unitSchema.index({ subjectId: 1 });

const Unit = mongoose.model("Unit", unitSchema);

module.exports = { Unit, clientSchema };
