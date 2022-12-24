const { check } = require("express-validator");
const commonCheckers = require("../common");
const errors = require("../../../config/errors");
const httpStatus = require("http-status");
const { ApiError } = require("../../apiError");

const validateCreatePackage = [
  check("gradeId").isMongoId().withMessage(errors.grade.invalidId),

  (req, res, next) => {
    const { numOfSubjects } = req.body;

    if (parseInt(numOfSubjects) < 1) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.package.invalidNumOfSubjects;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    req.body.numOfSubjects = numOfSubjects.toString();

    next();
  },

  (req, res, next) => {
    const { price } = req.body;

    if (!price || (typeof price !== "string" && typeof price !== "number")) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.package.invalidPrice;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    if (parseInt(price) < 10) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.package.invalidPrice;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    req.body.price = price.toString();

    next();
  },

  (req, res, next) => {
    const { months } = req.body;

    if (!months || (typeof months !== "string" && typeof months !== "number")) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.package.invalidMonths;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    const intMonths = parseInt(months);
    if (intMonths < 1 || intMonths > 12) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.package.invalidMonths;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    req.body.months = months.toString();

    next();
  },

  commonCheckers.handler,
];

const validateGetGradePackages = [commonCheckers.checkMongoIdQueryParam];

module.exports = {
  validateCreatePackage,
  validateGetGradePackages,
};
