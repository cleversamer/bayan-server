const mongoose = require("mongoose");
const { package: validation } = require("../../config/models");

const clientSchema = [
  "_id",
  "author",
  "price",
  "months",
  "levelId",
  "gradeId",
  "seasonId",
  "numOfSubjects",
];

const packageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    numOfSubjects: {
      type: Number,
      required: true,
      default: validation.numOfSubjects.default,
      min: validation.numOfSubjects.min,
      max: validation.numOfSubjects.max,
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
