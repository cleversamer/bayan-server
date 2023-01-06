const mongoose = require("mongoose");
const { season: validation } = require("../../../config/models");

const clientSchema = [
  "_id",
  "levelId",
  "gradeId",
  "author",
  "photoURL",
  "number",
];

const seasonSchema = new mongoose.Schema(
  {
    photoURL: {
      type: String,
      default: "",
      trim: true,
    },
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
    number: {
      type: Number,
      enum: validation.supportedSeasons,
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

// Create an index on the `gradeId` field to enhance
// get grade's seasons query
seasonSchema.index({ gradeId: 1 });

const Season = mongoose.model("Season", seasonSchema);

module.exports = {
  Season,
  clientSchema,
};
