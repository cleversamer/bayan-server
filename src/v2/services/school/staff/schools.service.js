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
