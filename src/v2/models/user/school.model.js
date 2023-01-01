const mongoose = require("mongoose");

const clientSchema = [
  "_id",
  "userId",
  "package",
  "grade",
  "subjects",
  "active",
];

const schoolSchema = new mongoose.Schema(
  {
    //
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

module.exports = { School, clientSchema };
