const mongoose = require("mongoose");
const { validationResult, check } = require("express-validator");
const httpStatus = require("http-status");
const { ApiError } = require("../apiError");
const errors = require("../../config/errors");
const countries = require("../../data/countries.json");
const { user: userValidation } = require("../../config/models");
const { server } = require("../../config/system");

//////////////////// COMMON FUNCTIONS ////////////////////
const next = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.array()[0].msg;
    const error = new ApiError(statusCode, message);
    return next(error);
  }

  next();
};

const authTypeHandler = (req, res, next) => {
  const errors = validationResult(req);
  let errorsArray = errors.array();
  const { authType } = req.body;
  if (authType === "google") {
    errorsArray = errorsArray.filter(
      (err) => err.param === "authType" || err.param === "phone"
    );
  }

  if (errorsArray.length) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.array()[0].msg;
    const error = new ApiError(statusCode, message);
    return next(error);
  }

  next();
};

const putQueryParamsInBody = (req, res, next) => {
  req.body = {
    ...req.body,
    ...req.query,
  };

  next();
};

const checkMongoIdQueryParam = (req, res, next) => {
  const emptyQueryParams = !Object.keys(req.query).length;
  if (emptyQueryParams) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.system.noMongoId;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  for (let item in req.query) {
    if (!mongoose.isValidObjectId(req.query[item])) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidMongoId;
      const err = new ApiError(statusCode, message);
      return next(err);
    }
  }

  next();
};

const checkMongoIdParam = (req, res, next) => {
  const emptyParams = !Object.keys(req.params).length;
  if (emptyParams) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.system.noMongoId;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  for (let item in req.params) {
    if (!mongoose.isValidObjectId(req.params[item])) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidMongoId;
      const err = new ApiError(statusCode, message);
      return next(err);
    }
  }

  next();
};

const conditionalCheck = (key, checker) => (req, res, next) => {
  return req.body[key] ? checker(req, res, next) : next();
};

const checkFile =
  (key, supportedTypes, compulsory = true) =>
  (req, res, next) => {
    if (!compulsory && (!req.files || !req.files[key])) {
      return next();
    }

    if (compulsory && (!req.files || !req.files[key])) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.noFile;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    const fileType = req.files[key].name.split(".")[1];
    if (!supportedTypes.includes(fileType)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.system.invalidExtension;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    next();
  };

//////////////////// AUTH FUNCTIONS ////////////////////
const checkRole = (exceptAdmin = false) =>
  exceptAdmin
    ? check("role")
        .trim()
        .isIn(userValidation.roles.filter((role) => role !== "admin"))
        .withMessage(errors.user.invalidRole)
    : check("role")
        .trim()
        .isIn(userValidation.roles)
        .withMessage(errors.user.invalidRole);

const checkAuthType = check("authType")
  .trim()
  .isIn(userValidation.authTypes)
  .withMessage(errors.auth.invalidAuthType);

const checkCode = check("code")
  .trim()
  .isLength({
    min: userValidation.verificationCode.exactLength,
    max: userValidation.verificationCode.exactLength,
  })
  .isNumeric()
  .withMessage(errors.auth.invalidCode);

const checkSendTo = check("sendTo")
  .trim()
  .isIn(userValidation.receiverTypes)
  .withMessage(errors.user.unsupportedReceiverType);

//////////////////// USER FUNCTIONS ////////////////////
const checkName = check("name")
  .trim()
  .isLength({
    min: userValidation.name.minLength,
    max: userValidation.name.maxLength,
  })
  .withMessage(errors.auth.invalidName);

const checkEmail = check("email")
  .trim()
  .isEmail()
  .isLength({
    min: userValidation.email.minLength,
    max: userValidation.email.maxLength,
  })
  .withMessage(errors.auth.invalidEmail);

const checkPhone = (req, res, next) => {
  if (typeof req.body.phone !== "object") {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.auth.invalidPhone;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  let { icc, nsn } = req.body.phone;

  // Convert phone to string if it's not a string.
  icc = String(icc).trim();
  nsn = String(nsn).trim();

  // Check if icc starts with a plus `+`
  if (!icc.startsWith("+")) {
    req.body.phone.icc = `+${icc}`;
    icc = `+${icc}`;
  }

  // Check if phone's ICC is correct
  const iccExist = countries.list.find((c) => c.icc === icc);
  if (!iccExist) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.auth.invalidICC;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  // Check if phone's NSN is in range
  if (nsn.length < countries.minNSN || nsn.length > countries.maxNSN) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.auth.invalidPhone;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  // Check if phone's NSN contains only numbers
  for (let i = 0; i < nsn.length; i++) {
    const char = nsn.charCodeAt(i);

    if (char < 48 || char > 57) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.phoneNotOnlyNumbers;
      const err = new ApiError(statusCode, message);
      return next(err);
    }
  }

  next();
};

const checkEmailOrPhone = check("emailOrPhone")
  .trim()
  .isLength({
    min: Math.min(userValidation.email.minLength, countries.minPhone),
    max: Math.max(userValidation.email.maxLength, countries.maxPhone),
  })
  .withMessage(errors.auth.invalidEmailOrPhone);

const checkPassword = check("password")
  .trim()
  .isLength({
    min: userValidation.password.minLength,
    max: userValidation.password.maxLength,
  })
  .withMessage(errors.auth.invalidPassword);

const checkOldPassword = check("oldPassword")
  .trim()
  .isLength({
    min: userValidation.password.minLength,
    max: userValidation.password.maxLength,
  })
  .withMessage(errors.auth.invalidOldPassword);

const checkNewPassword = check("newPassword")
  .trim()
  .isLength({
    min: userValidation.password.minLength,
    max: userValidation.password.maxLength,
  })
  .withMessage(errors.auth.invalidNewPassword);

const checkLanguage = check("lang")
  .trim()
  .notEmpty()
  .withMessage(errors.user.noLanguage)
  .isIn(server.SUPPORTED_LANGUAGES)
  .withMessage(errors.user.unsupportedLanguage);

const checkUserId = check("userId")
  .isMongoId()
  .withMessage(errors.user.invalidId);

//////////////////// PACKAGE FUNCTIONS ////////////////////
const checkPackageId = check("packageId")
  .isMongoId()
  .withMessage(errors.package.invalidId);

//////////////////// SUBJECT FUNCTIONS ////////////////////
const checkSubjects = (req, res, next) => {
  const { subjects } = req.body;

  if (!Array.isArray(subjects) || !subjects.length) {
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
};

module.exports = {
  // COMMON
  next,
  authTypeHandler,
  putQueryParamsInBody,
  checkMongoIdQueryParam,
  conditionalCheck,
  checkFile,
  checkMongoIdParam,
  // AUTH
  checkRole,
  checkAuthType,
  checkCode,
  checkSendTo,
  // USER
  checkName,
  checkEmail,
  checkPhone,
  checkEmailOrPhone,
  checkPassword,
  checkOldPassword,
  checkNewPassword,
  checkLanguage,
  checkUserId,
  // PACKAGE
  checkPackageId,
  // SUBJECT
  checkSubjects,
};
