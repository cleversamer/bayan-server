const { Level } = require("../../../models/school/sections/level.model");
const schoolsService = require("../../school/staff/schools.service");
const localStorage = require("../../storage/localStorage.service");
const cloudStorage = require("../../storage/cloudStorage.service");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.findLevelById = async (levelId) => {
  try {
    return await Level.findById(levelId);
  } catch (err) {
    throw err;
  }
};

module.exports.getSchoolLevels = async (schoolId) => {
  try {
    // Find all levels for a school
    const levels = await Level.find({ schoolId });

    // Check if there are no levels
    if (!levels || !levels.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.level.noLevels;
      throw new ApiError(statusCode, message);
    }

    return levels;
  } catch (err) {
    throw err;
  }
};

module.exports.createLevel = async (user, schoolId, title, photo) => {
  try {
    // Asking service to find school
    const school = await schoolsService.findSchoolById(schoolId);

    // Create a new level
    const level = new Level({
      author: user._id,
      schoolId: school._id,
      title,
    });

    // Save the level to the DB
    const savedLevel = await level.save();

    // Store level's photo locally
    const localFile = await localStorage.storeFile(photo);

    // Store level's photo on the cloud
    const cloudFile = await cloudStorage.uploadFile(localFile);

    // Delete local level's photo
    await localStorage.deleteFile(localFile);

    // Update level's photo URL
    savedLevel.photoURL = cloudFile;

    // Save the level to the DB
    await savedLevel.save();

    return savedLevel;
  } catch (err) {
    throw err;
  }
};
