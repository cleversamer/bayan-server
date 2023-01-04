const {
  CLIENT_SCHEMA,
} = require("../../../models/school/sections/level.model");
const { levelsService } = require("../../../services");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const _ = require("lodash");

module.exports.getAllLevels = async (req, res, next) => {
  try {
    const levels = await levelsService.getAllLevels();

    const response = {
      levels: levels.map((level) => _.pick(level, CLIENT_SCHEMA)),
    };

    res.status(httpStatus.OK).json(response);
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

    const response = _.pick(level, CLIENT_SCHEMA);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.level.levelExist;
      err = new ApiError(statusCode, message);
    }

    next(err);
  }
};
