const mongoose = require("mongoose");
const { package: validation } = require("../../config/models");

const clientSchema = [
  "_id",
  "price",
  "months",
  "numOfSubjects",
  "authorId",
  "schoolId",
  "levelId",
  "gradeId",
  "seasonId",
];

const packageSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
      min: validation.price.min,
      max: validation.price.max,
    },
    months: {
      type: Number,
      required: true,
      min: validation.months.min,
      max: validation.months.max,
    },
    numOfSubjects: {
      type: Number,
      required: true,
      default: validation.numOfSubjects.default,
      min: validation.numOfSubjects.min,
      max: validation.numOfSubjects.max,
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
    gradeId: {
      type: mongoose.Types.ObjectId,
      ref: "Grade",
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
// get grade's packages query
packageSchema.index({ gradeId: 1 });

const Package = mongoose.model("Package", packageSchema);

module.exports = {
  Package,
  clientSchema,
};
