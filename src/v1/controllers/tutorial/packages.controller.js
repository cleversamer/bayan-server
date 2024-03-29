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

    res.status(httpStatus.CREATED).json(package);
  } catch (err) {
    next(err);
  }
};

module.exports.getGradePackages = async (req, res, next) => {
  try {
    const { gradeId } = req.query;

    const packages = await packagesService.getGradePackages(gradeId);

    if (!packages || !packages.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.package.noPackages;
      throw new ApiError(statusCode, message);
    }

    res.status(httpStatus.OK).json(packages);
  } catch (err) {
    next(err);
  }
};
