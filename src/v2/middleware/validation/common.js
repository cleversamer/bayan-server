const mongoose = require("mongoose");
const { validationResult, check } = require("express-validator");
const httpStatus = require("http-status");
const { ApiError } = require("../apiError");
const errors = require("../../config/errors");
const countries = require("../../data/countries.json");
const {
  user: userValidation,
  level: levelValidation,
  grade: gradeValidation,
  season: seasonValidation,
  subject: subjectValidation,
  unit: unitValidation,
  lesson: lessonValidation,
  video: videoValidation,
  document: documentValidation,
  question: questionValidation,
  quiz: quizValidation,
  package: packageValidation,
} = require("../../config/models");
const { server } = require("../../config/system");

//////////////////// COMMON FUNCTIONS ////////////////////
const next = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.array()[0].msg;
    const err = new ApiError(statusCode, message);
    return next(err);
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

const conditionalCheck = (key, checker) => (req, res, next) =>
  req.body[key] ? checker(req, res, next) : next();

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
  .withMessage(errors.auth.invalidEmail)
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
  .isIn(server.SUPPORTED_LANGUAGES)
  .withMessage(errors.user.unsupportedLanguage);

const checkUserId = check("userId")
  .isMongoId()
  .withMessage(errors.user.invalidId);

//////////////////// LEVEL FUNCTIONS ////////////////////
const checkLevelId = check("levelId")
  .isMongoId()
  .withMessage(errors.level.invalidId);

const checkLevelTitle = check("title")
  .isLength({
    min: levelValidation.title.minLength,
    max: levelValidation.title.maxLength,
  })
  .withMessage(errors.level.invalidTitle);

//////////////////// GRADE FUNCTIONS ////////////////////
const checkGradeId = check("gradeId")
  .isMongoId()
  .withMessage(errors.grade.invalidId);

const checkGradeNumber = check("number")
  .isIn(gradeValidation.supportedGrades.all)
  .withMessage(errors.grade.invalidGrade);

//////////////////// SEASON FUNCTIONS ////////////////////
const checkSeasonId = check("seasonId")
  .isMongoId()
  .withMessage(errors.season.invalidId);

const checkkSeasonNumber = check("number")
  .isIn(seasonValidation.supportedSeasons)
  .withMessage(errors.season.invalidSeason);

//////////////////// SUBJECT FUNCTIONS ////////////////////
const checkSubjectId = check("subjectId")
  .isMongoId()
  .withMessage(errors.subject.invalidId);

const checkSubjectTitle = check("title")
  .isLength({
    min: subjectValidation.title.minLength,
    max: subjectValidation.title.maxLength,
  })
  .withMessage(errors.subject.invalidTitle);

const checkSubjectVideoType = (req, res, next) => {
  const { videoType } = req.body;

  if (!videoType) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.video.noVideo;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  switch (videoType) {
    case "url":
      return check("videoURL").isURL().withMessage(errors.video.invalidURL)(
        req,
        res,
        next
      );

    case "video":
      return commonMiddleware.checkFile("video", ["mp4"])(req, res, next);

    default:
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.video.invalidType;
      const err = new ApiError(statusCode, message);
      return next(err);
  }
};

//////////////////// UNIT FUNCTIONS ////////////////////
const checkUnitId = check("unitId")
  .isMongoId()
  .withMessage(errors.unit.invalidId);

const checkUnitTitle = check("title")
  .isLength({
    min: unitValidation.title.minLength,
    max: unitValidation.title.maxLength,
  })
  .withMessage(errors.unit.invalidTitle);

//////////////////// LESSON FUNCTIONS ////////////////////
const checkLessonId = check("lessonId")
  .isMongoId()
  .withMessage(errors.lesson.invalidId);

const checkLessonTitle = check("title")
  .isLength({
    min: lessonValidation.title.minLength,
    max: lessonValidation.title.maxLength,
  })
  .withMessage(errors.lesson.invalidTitle);

//////////////////// VIDEO FUNCTIONS ////////////////////
const checkVideoTitle = check("title")
  .isLength({
    min: videoValidation.title.minLength,
    max: videoValidation.title.maxLength,
  })
  .withMessage(errors.video.invalidTitle);

const checkVideoDescription = check("description")
  .isLength({
    min: videoValidation.description.minLength,
    max: videoValidation.description.maxLength,
  })
  .withMessage(errors.video.invalidDescription);

const checkVideoType = (req, res, next) => {
  const { type } = req.body;

  if (!type) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.video.noVideo;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  switch (type) {
    case "url":
      return check("url").isURL().withMessage(errors.video.invalidURL)(
        req,
        res,
        next
      );

    case "video":
      return commonCheckers.checkFile("video", ["mp4"])(req, res, next);

    default:
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.video.invalidType;
      const err = new ApiError(statusCode, message);
      return next(err);
  }
};

//////////////////// DOCUMENT FUNCTIONS ////////////////////
const checkDocumentTitle = check("title")
  .isLength({
    min: documentValidation.title.minLength,
    max: documentValidation.title.maxLength,
  })
  .withMessage(errors.document.invalidTitle);

//////////////////// QUIZ FUNCTIONS ////////////////////
const checkQuizId = check("quizId")
  .isMongoId()
  .withMessage(errors.quiz.invalidId);

const checkQuizTitle = check("title")
  .isLength({
    min: quizValidation.title.minLength,
    max: quizValidation.title.maxLength,
  })
  .withMessage(errors.quiz.invalidTitle);

//////////////////// QUESTION FUNCTIONS ////////////////////
const checkQuestionTitle = check("title")
  .isLength({
    min: questionValidation.title.minLength,
    max: questionValidation.title.maxLength,
  })
  .withMessage(errors.question.invalidTitle);

const checkQuestionOptions = (req, res, next) => {
  const { options = [] } = req.body;

  if (!Array.isArray(options)) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.question.invalidOptionsType;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  const isValidOptionsNumber =
    options.length >= questionValidation.options.min &&
    options.length <= questionValidation.options.max;

  if (!isValidOptionsNumber) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.question.invalidOptionsLength;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  for (let option of options) {
    if (typeof option !== "string") {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.question.invalidOptionsType;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    const isValidOptionLength =
      option.length >= questionValidation.option.minLength &&
      option.length <= questionValidation.option.maxLength;

    if (!isValidOptionLength) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.question.invalidOptionLength;
      const err = new ApiError(statusCode, message);
      return next(err);
    }
  }

  const extraOptions = questionValidation.options.max - options.length;
  for (let i = 0; i < extraOptions; i++) {
    options.push("");
  }

  next();
};

const checkQuestionAnswer = (req, res, next) => {
  const { options = [], answer } = req.body;

  if (typeof answer !== "string") {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.question.invalidAnswerType;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  const isValidAnswerLength =
    answer.length >= questionValidation.answer.minLength &&
    answer.length <= questionValidation.answer.maxLength;

  if (!isValidAnswerLength) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.question.invalidAnswerLength;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  if (!options.includes(answer)) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.question.answerNotMatchOption;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  next();
};

//////////////////// SUBMISSION FUNCTIONS ////////////////////
const checkSubmissionAnswers = (req, res, next) => {
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.submission.answersNotArray;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  for (let answer of answers) {
    if (!mongoose.isValidObjectId(answer.questionId)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.question.invalidId;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    if (typeof answer.content !== "string" || !answer.content) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.submission.answersNotArray;
      const err = new ApiError(statusCode, message);
      return next(err);
    }
  }

  next();
};

//////////////////// PACKAGE FUNCTIONS ////////////////////
const checkPackageId = check("packageId")
  .isMongoId()
  .withMessage(errors.package.invalidId);

const checkPackageNumOfSubjects = (req, res, next) => {
  const { numOfSubjects } = req.body;

  if (typeof numOfSubjects !== "number") {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.package.invalidNumOfSubjects;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  const isValidLength =
    numOfSubjects >= packageValidation.numOfSubjects.min &&
    numOfSubjects <= packageValidation.numOfSubjects.max;

  if (!isValidLength) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.package.invalidNumOfSubjects;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  next();
};

const checkPackagePrice = (req, res, next) => {
  const { price } = req.body;

  if (!price || (typeof price !== "string" && typeof price !== "number")) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.package.invalidPrice;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  const isValidPrice =
    price >= packageValidation.price.min &&
    price >= packageValidation.price.max;

  if (!isValidPrice) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.package.invalidPrice;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  next();
};

const checkPackageMonths = (req, res, next) => {
  const { months } = req.body;

  if (typeof months !== "number") {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.package.invalidMonths;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  const isValidMonths =
    months >= packageValidation.months.min &&
    months <= packageValidation.months.max;

  if (!isValidMonths) {
    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.package.invalidMonths;
    const err = new ApiError(statusCode, message);
    return next(err);
  }

  next();
};

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
  // LEVEL
  checkLevelId,
  checkLevelTitle,
  // GRADE
  checkGradeId,
  checkGradeNumber,
  // SEASON
  checkSeasonId,
  checkkSeasonNumber,
  // SUBJECT
  checkSubjectId,
  checkSubjectTitle,
  checkSubjectVideoType,
  // UNIT
  checkUnitId,
  checkUnitTitle,
  // LESSON
  checkLessonId,
  checkLessonTitle,
  // VIDEO
  checkVideoTitle,
  checkVideoDescription,
  checkVideoType,
  // DOCUMENT
  checkDocumentTitle,
  // QUIZ
  checkQuizId,
  checkQuizTitle,
  // QUESTION
  checkQuestionTitle,
  checkQuestionOptions,
  checkQuestionAnswer,
  // SUBMISSION
  checkSubmissionAnswers,
  // PACKAGE
  checkPackageId,
  checkPackageNumOfSubjects,
  checkPackagePrice,
  checkPackageMonths,
  // SUBJECT
  checkSubjects,
};
