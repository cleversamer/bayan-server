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
