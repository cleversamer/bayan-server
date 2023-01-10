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
    // Find subject
    const subject = await subjectsService.findSubjectById(subjectId);

    // Check if subject belongs to user's school
    if (!user.isBelongToSchool(subject.schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.subject.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Check if subject exists
    if (!subject) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subject.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if unit is already added
    const subjectUnits = await Unit.find({
      schoolId: user.schoolId,
      subjectId: subject._id,
    });
    const unitAdded = subjectUnits.find((unit) => unit.title === title);
    if (unitAdded) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.unit.unitExist;
      throw new ApiError(statusCode, message);
    }

    // Create a new unit
    const unit = new Unit({
      title,
      author: user._id,
      schoolId: user.schoolId,
      levelId: subject.levelId,
      gradeId: subject.gradeId,
      seasonId: subject.seasonId,
      subjectId: subject._id,
    });

    // Save unit to the DB
    await unit.save();

    return unit;
  } catch (err) {
    throw err;
  }
};

module.exports.getSubjectUnits = async (user, schoolId, subjectId) => {
  try {
    // Check if user belongs to the school
    if (!user.isBelongToSchool(schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Get school units for this subject
    const units = await Unit.find({ schoolId, subjectId });

    // Check if units exist
    if (!units || !units.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.unit.noUnits;
      throw new ApiError(statusCode, message);
    }

    return units;
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
