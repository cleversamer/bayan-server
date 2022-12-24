const { levelsService } = require("../../services");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");
const _ = require("lodash");

module.exports.getAllLevels = async (req, res, next) => {
  try {
    const levels = await levelsService.getAllLevels();
    res.status(httpStatus.OK).json(levels);
  } catch (err) {
    next(err);
  }
};

module.exports.createLevel = async (req, res, next) => {
  try {
    const user = req.user;
    const { title } = req.body;
    const { photo } = req.files;

    const level = await levelsService.createLevel(user, title, photo);

    res.status(httpStatus.CREATED).json(level);
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.level.levelExist;
      err = new ApiError(statusCode, message);
    }

    next(err);
  }
};

module.exports.getAllSupportedLevels = (req, res, next) => {
  try {
    const supportedLevels = levelsService.getAllSupportedLevels();
    res.status(httpStatus.OK).json(supportedLevels);
  } catch (err) {
    next(err);
  }
};
