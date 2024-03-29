const mongoose = require("mongoose");
const { school: validation } = require("../../../config/models");

const clientSchema = ["_id", "managerId", "name"];

const schoolSchema = new mongoose.Schema(
  {
    managerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: validation.name.minLength,
      maxLength: validation.name.maxLength,
    },
    active: {
      type: Boolean,
      default: false,
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
