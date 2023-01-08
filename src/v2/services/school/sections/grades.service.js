const { Grade } = require("../../../models/school/sections/grade.model");
const levelsService = require("./levels.service");
const localStorage = require("../../storage/localStorage.service");
const cloudStorage = require("../../storage/cloudStorage.service");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.findGradeById = async (gradeId) => {
  try {
    return await Grade.findById(gradeId);
  } catch (err) {
    throw err;
  }
};

module.exports.createGrade = async (user, levelId, number, photo) => {
  try {
    // Asking servide to find level
    const level = await levelsService.findLevelById(levelId);

    // Check if level belongs to user's school
    if (user.schoolId.toString() !== level.schoolId.toString()) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.level.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Check if level does not exist
    if (!level) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.level.notFound;
      throw new ApiError(statusCode, message);
    }

    // Create a new grade
    const grade = new Grade({
      number,
      author: user._id,
      schoolId: user.schoolId,
      levelId: level._id,
    });

    // Save grade to the DB
    const savedGrade = await grade.save();

    // Store file locally
    const localFile = await localStorage.storeFile(photo);

    // Store file on the cloud
    const cloudFile = await cloudStorage.uploadFile(localFile);

    // Delete local file
    await localStorage.deleteFile(localFile);

    // Update grade's photo URL
    savedGrade.photoURL = cloudFile;

    // Save the grade to the DB
    await savedGrade.save();

    return savedGrade;
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.grade.gradeExist;
      err = new ApiError(statusCode, message);
    }

    throw err;
  }
};

module.exports.getLevelGrades = async (user, schoolId, levelId) => {
  try {
    // Check if user belongs to the school
    if (!user.isBelongToSchool(schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Get grades that belong to the specified school and level
    const grades = await Grade.find({ schoolId, levelId });

    // Check if there are no grades
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
