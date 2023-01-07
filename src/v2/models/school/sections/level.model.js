const mongoose = require("mongoose");
const { level: validation } = require("../../../config/models");

const clientSchema = ["_id", "photoURL", "title", "authorId", "schoolId"];

const levelSchema = new mongoose.Schema(
  {
    photoURL: {
      type: String,
      default: "",
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: validation.title.minLength,
      maxLength: validation.title.maxLength,
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
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);

const Level = mongoose.model("Level", levelSchema);

module.exports = {
  Level,
  clientSchema,
};
