const { SUPPORTED_ROLES } = require("../../../models/user/user.model");
const mongoose = require("mongoose");
const { check } = require("express-validator");
const { ApiError } = require("../../apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");

const validateUpdateProfile = [
  commonCheckers.conditionalCheck(
    "name",
    check("name")
      .trim()
      .isLength({ min: 8, max: 64 })
      .withMessage(errors.auth.invalidName)
  ),

  commonCheckers.conditionalCheck("phone", commonCheckers.checkPhone),

  commonCheckers.conditionalCheck(
    "email",
    check("email").trim().isEmail().withMessage(errors.auth.invalidEmail).bail()
  ),

  commonCheckers.conditionalCheck(
    "password",
    check("password")
      .trim()
      .isLength({ min: 8, max: 32 })
      .withMessage(errors.auth.invalidPassword)
  ),

  commonCheckers.conditionalCheck(
    "avatar",
    commonCheckers.checkFile("avatar", ["png", "jpg", "jpeg"])
  ),

  commonCheckers.handler,
];

const validateGetUserSubscriptions = [commonCheckers.checkMongoIdParam];

const validateUpdateUserProfile = [
  check("userId").isMongoId().withMessage(errors.user.invalidId),

  commonCheckers.conditionalCheck(
    "avatar",
    commonCheckers.checkFile("avatar", ["png", "jpg", "jpeg"])
  ),

  ...validateUpdateProfile,
];

const validateUpdateUserRole = [
  check("userId").isMongoId().withMessage(errors.user.invalidId),

  check("role").isIn(SUPPORTED_ROLES).withMessage(errors.user.invalidRole),

  commonCheckers.handler,
];

const validateValidateUser = [
  check("userId").isMongoId().withMessage(errors.user.invalidId),

  commonCheckers.handler,
];

const validateFindUserByEmailOrPhone = [
  (req, res, next) => {
    req.body.emailOrPhone = req.params.id;
    req.body.role = req.params.role;

    next();
  },

  check("emailOrPhone")
    .trim()
    .isString()
    .withMessage(errors.auth.invalidEmailOrPhone)
    .bail(),

  check("role")
    .isIn(SUPPORTED_ROLES.filter((r) => r !== "admin"))
    .withMessage(errors.user.invalidRole),

  commonCheckers.handler,
];

const validateSubscripeToPackage = [
  check("packageId").isMongoId().withMessage(errors.package.invalidId),

  (req, res, next) => {
    const { subjects } = req.body;

    if (!Array.isArray(subjects)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.noSubjectsAdded;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    if (!subjects.length) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.noSubjectsAdded;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    for (let subject of subjects) {
      if (!mongoose.isValidObjectId(subject)) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errors.subscription.invalidSubjects;
        const err = new ApiError(statusCode, message);
        return next(err);
      }
    }

    next();
  },

  commonCheckers.handler,
];

module.exports = {
  validateUpdateProfile,
  validateSubscripeToPackage,
  validateUpdateUserProfile,
  validateUpdateUserRole,
  validateValidateUser,
  validateFindUserByEmailOrPhone,
  validateGetUserSubscriptions,
};
