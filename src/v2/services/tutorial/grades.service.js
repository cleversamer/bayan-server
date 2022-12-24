const mongoose = require("mongoose");
const { Grade } = require("../../models/tutorial/grade.model");
const levelsService = require("./levels.service");
const localStorage = require("../storage/localStorage.service");
const cloudStorage = require("../storage/cloudStorage.service");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");

module.exports.findGradeById = async (gradeId) => {
  try {
    return await Grade.findById(gradeId);
  } catch (err) {
    throw err;
  }
};

module.exports.createGrade = async (user, levelId, number, photo) => {
  try {
    const level = await levelsService.findLevelById(levelId);

    if (!level) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.level.notFound;
      throw new ApiError(statusCode, message);
    }

    const grade = new Grade({
      author: user._id,
      number,
      levelId: new mongoose.Types.ObjectId(levelId),
    });

    const savedGrade = await grade.save();

    const localFile = await localStorage.storeFile(photo);
    const cloudFile = await cloudStorage.uploadFile(localFile);
    // await localStorage.deleteFile(localFile);
    savedGrade.photoURL = cloudFile;

    return await savedGrade.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getLevelGrades = async (levelId) => {
  try {
    const grades = await Grade.find({ levelId });

    if (!grades || !grades.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.grade.noGrades;
      throw new ApiError(statusCode, message);
    }

    return grades;
  } catch (err) {
    throw err;
  }
};
