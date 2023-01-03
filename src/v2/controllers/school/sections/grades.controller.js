const { CLIENT_SCHEMA } = require("../../../models/tutorial/grade.model");
const { gradesService } = require("../../../services");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const _ = require("lodash");

module.exports.createGrade = async (req, res, next) => {
  try {
    const user = req.user;
    const { levelId, number } = req.body;
    const { photo } = req.files;

    const grade = await gradesService.createGrade(user, levelId, number, photo);

    const response = _.pick(grade, CLIENT_SCHEMA);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.grade.gradeExist;
      err = new ApiError(statusCode, message);
    }

    next(err);
  }
};

module.exports.getLevelGrades = async (req, res, next) => {
  try {
    const { levelId } = req.query;

    const grades = await gradesService.getLevelGrades(levelId);

    const response = {
      grades: grades.map((grade) => _.pick(grade, CLIENT_SCHEMA)),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
