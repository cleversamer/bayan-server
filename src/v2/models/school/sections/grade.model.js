const mongoose = require("mongoose");

const CLIENT_SCHEMA = ["_id", "author", "levelId", "photoURL", "number"];

const SUPPORTED_GRADES = {
  ALL: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  PRIMARY: ["1", "2", "3", "4", "5"],
  MIDDLE: ["6", "7", "8", "9"],
  HIGH: ["10", "11", "12"],
};

const gradeSchema = new mongoose.Schema(
  {
    photoURL: {
      type: String,
      default: "",
    },
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
    number: {
      type: String,
      enum: SUPPORTED_GRADES.ALL,
      trim: true,
      required: true,
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

// Create an index on the `levelId` field to enhance
// get level's grades query
gradeSchema.index({ levelId: 1 });

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = {
  Grade,
  CLIENT_SCHEMA,
  SUPPORTED_GRADES,
};
