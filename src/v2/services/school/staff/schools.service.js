const { School } = require("../../../models/school/staff/school.model");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.findSchoolById = async (schoolId) => {
  try {
    // Find school with the given id
    const school = await School.findById(schoolId);

    // Check if school does not exist
    if (!school) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.school.notFound;
      throw new ApiError(statusCode, message);
    }

    return school;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllSchools = async (skip) => {
  try {
    // Find all active schools
    const schools = await School.find({ active: true })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(10);

    // Check if there are no active schools
    if (!schools || !schools.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.school.noSchools;
      throw new ApiError(statusCode, message);
    }

    return schools;
  } catch (err) {
    throw err;
  }
};

module.exports.createSchool = async (user, name) => {
  try {
    // Check if user (manager) belongs to a school
    if (user.schoolId) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.alreadyManager;
      throw new ApiError(statusCode, message);
    }

    // Create the school
    const school = new School({
      managerId: user._id,
      name,
    });

    // Save school to the DB
    await school.save();

    // Set the user as a manager to this school
    user.schoolId = school._id;

    // Save user to the DB
    await user.save();

    return school;
  } catch (err) {
    throw err;
  }
};

module.exports.getInActiveSchools = async (skip) => {
  try {
    // Find all inactive schools
    const schools = await School.find({ active: false })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(10);

    // Check if there are no active schools
    if (!schools || !schools.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.school.noInactiveSchools;
      throw new ApiError(statusCode, message);
    }

    return schools;
  } catch (err) {
    throw err;
  }
};

module.exports.activateSchool = async (schoolId) => {
  try {
    // Check if school exists
    const school = await this.findSchoolById(schoolId);

    // Check if school is already active
    if (school.active) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.school.alreadyActive;
      throw new ApiError(statusCode, message);
    }

    // Activate school
    school.active = true;

    // Save school to the DB
    await school.save();

    return school;
  } catch (err) {
    throw err;
  }
};
