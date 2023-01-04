const { Unit } = require("../../../models/school/sections/unit.model");
const subjectsService = require("./subjects.service");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.findUnitById = async (unitId) => {
  try {
    return await Unit.findById(unitId);
  } catch (err) {
    throw err;
  }
};

module.exports.createUnit = async (user, subjectId, title) => {
  try {
    const subject = await subjectsService.findSubjectById(subjectId);

    if (!subject) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subject.notFound;
      throw new ApiError(statusCode, message);
    }

    const subjectUnits = await Unit.find({ subjectId: subject._id });
    const unitAdded = subjectUnits.find((unit) => unit.title === title);
    if (unitAdded) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.unit.unitExist;
      throw new ApiError(statusCode, message);
    }

    const unit = new Unit({
      title,
      author: user._id,
      levelId: subject.levelId,
      gradeId: subject.gradeId,
      seasonId: subject.seasonId,
      subjectId: subject._id,
    });

    return await unit.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getSubjectUnits = async (subjectId) => {
  try {
    const subject = await subjectsService.findSubjectById(subjectId);
    const units = await Unit.find({ subjectId });

    return {
      units,
      videoURL: subject.videoURL,
    };
  } catch (err) {
    throw err;
  }
};

module.exports.getUnitLessons = async (unitId) => {
  try {
    const unit = await this.findUnitById(unitId);

    return unit.lessons;
  } catch (err) {
    throw err;
  }
};
