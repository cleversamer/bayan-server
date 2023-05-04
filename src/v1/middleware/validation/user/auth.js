const { AUTH_TYPES } = require("../../../models/user/user.model");
const { check } = require("express-validator");
const { auth: errors } = require("../../../config/errors");
const commonCheckers = require("../common");

const loginValidator = [
  // check("emailOrPhone")
  //   .trim()
  //   .isString()
  //   .withMessage(errors.invalidEmailOrPhone)
  //   .bail(),

  // check("password")
  //   .trim()
  //   .isLength({ min: 8, max: 32 })
  //   .withMessage(errors.invalidPassword),

  // check("authType").trim().isIn(AUTH_TYPES).withMessage(errors.invalidAuthType),

  commonCheckers.authTypeHandler,
];

const registerValidator = [
  check("name")
    .trim()
    .isLength({ min: 8, max: 64 })
    .withMessage(errors.invalidName),

  check("email").trim().isEmail().withMessage(errors.invalidEmail).bail(),

  commonCheckers.checkPhone,

  check("password")
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage(errors.invalidPassword),

  check("authType").trim().isIn(AUTH_TYPES).withMessage(errors.invalidAuthType),

  commonCheckers.authTypeHandler,
];

const resetPasswordValidator = [
  check("newPassword")
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage(errors.invalidPassword),

  commonCheckers.handler,
];

const forgotPasswordValidator = [
  check("email").trim().isEmail().withMessage(errors.invalidEmail).bail(),

  check("newPassword")
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage(errors.invalidPassword),

  commonCheckers.handler,
];

const emailValidator = [
  check("email").trim().isEmail().withMessage(errors.invalidEmail).bail(),

  commonCheckers.handler,
];

module.exports = {
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  forgotPasswordValidator,
  emailValidator,
};
