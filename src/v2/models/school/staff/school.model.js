const mongoose = require("mongoose");

const clientSchema = ["_id", "name"];

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
