const mongoose = require("mongoose");
const { school: validation } = require("../../../config/models");

const clientSchema = ["_id", "name"];

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: validation.name.minLength,
      maxLength: validation.name.maxLength,
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

const School = mongoose.model("School", schoolSchema);

module.exports = {
  School,
  clientSchema,
};
