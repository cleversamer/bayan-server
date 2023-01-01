const { clientSchema } = require("../../models/tutorial/package.model");
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

    const response = _.pick(package, clientSchema);

    res.status(httpStatus.CREATED).json(response);
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

    const response = {
      packages: packages.map((package) => _.pick(package, clientSchema)),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
