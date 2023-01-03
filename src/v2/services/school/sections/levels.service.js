const { Level } = require("../../../models/tutorial/level.model");
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

module.exports.getAllLevels = async () => {
  try {
    const levels = await Level.find({}, { __v: 0, grades: 0 }).sort({
      title: "asc",
    });

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

module.exports.createLevel = async (user, title, photo) => {
  try {
    const level = new Level({ author: user._id, title });

    const savedLevel = await level.save();

    const localFile = await localStorage.storeFile(photo);
    const cloudFile = await cloudStorage.uploadFile(localFile);
    await localStorage.deleteFile(localFile);
    savedLevel.photoURL = cloudFile;

    return await savedLevel.save();
  } catch (err) {
    throw err;
  }
};
