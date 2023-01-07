const mongoose = require("mongoose");
const { grade: validation } = require("../../../config/models");

const clientSchema = [
  "_id",
  "photoURL",
  "number",
  "authorId",
  "schoolId",
  "levelId",
];

const gradeSchema = new mongoose.Schema(
  {
    photoURL: {
      type: String,
      default: "",
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
    levelId: {
      type: mongoose.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    number: {
      type: Number,
      enum: validation.supportedGrades.all,
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

// Create an index on the `levelId` field to enhance
// get level's grades query
gradeSchema.index({ levelId: 1 });

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = {
  Grade,
  clientSchema,
};
