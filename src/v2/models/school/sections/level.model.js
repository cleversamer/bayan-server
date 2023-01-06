const mongoose = require("mongoose");
const { level: validation } = require("../../../config/models");

const clientSchema = ["_id", "title", "author", "photoURL", "number"];

const levelSchema = new mongoose.Schema(
  {
    photoURL: {
      type: String,
      default: "",
      trim: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

const Level = mongoose.model("Level", levelSchema);

module.exports = {
  Level,
  clientSchema,
};
