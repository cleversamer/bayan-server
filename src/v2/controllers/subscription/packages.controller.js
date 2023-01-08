const { clientSchema } = require("../../models/subscription/package.model");
const { packagesService } = require("../../services");
const httpStatus = require("http-status");
const errors = require("../../config/errors");
const { ApiError } = require("../../middleware/apiError");

module.exports.createPackage = async (req, res, next) => {
  try {
    const user = req.user;
    const { gradeId, numOfSubjects, price, months } = req.body;

    const package = await packagesService.createPackage(
      user,
      gradeId,
      numOfSubjects,
      price,
      months
    );

    // Genereate the response object
    const response = _.pick(package, clientSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getGradePackages = async (req, res, next) => {
  try {
    const { schoolId, gradeId } = req.query;

    // Asking service to get school packages for this grade
    const packages = await packagesService.getGradePackages(schoolId, gradeId);

    // Check if there are no packages
    if (!packages || !packages.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.package.noPackages;
      throw new ApiError(statusCode, message);
    }

    // Genereate the response object
    const response = {
      packages: packages.map((package) => _.pick(package, clientSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
