const mongoose = require("mongoose");
const { check } = require("express-validator");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");
const httpStatus = require("http-status");
const { ApiError } = require("../../apiError");

const validateCreateLesson = [
  check("unitId").isMongoId().withMessage(errors.unit.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.lesson.invalidTitle),

  commonCheckers.next,
];

const validateGetUnitLessons = [commonCheckers.checkMongoIdParam];

const validateAddDocument = [
  check("lessonId").isMongoId().withMessage(errors.lesson.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.document.invalidTitle),

  commonCheckers.checkFile("file", ["pdf", "rar"]),

  commonCheckers.next,
];

const validateAddVideo = [
  check("lessonId").isMongoId().withMessage(errors.lesson.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.video.invalidTitle),

  check("description")
    .isLength({ min: 1, max: 1024 })
    .withMessage(errors.video.invalidDescription),

  (req, res, next) => {
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
  },

  commonCheckers.next,
];

const validateAddQuiz = [
  check("lessonId").isMongoId().withMessage(errors.lesson.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.quiz.invalidTitle),

  commonCheckers.next,
];

const validateAddQuestionToQuiz = [
  check("quizId").isMongoId().withMessage(errors.quiz.invalidId),

  check("title")
    .isLength({ min: 1, max: 512 })
    .withMessage(errors.question.invalidTitle),

  commonCheckers.checkFile("photo", ["png", "jpg", "jpeg"], false),

  // Check options
  (req, res, next) => {
    const { options = [] } = req.body;

    if (!Array.isArray(options)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.question.invalidOptionsType;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    if (options.length < 2 || options.length > 4) {
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

      if (option.length >= 256) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errors.question.invalidOptionLength;
        const err = new ApiError(statusCode, message);
        return next(err);
      }
    }

    const extraOptions = 4 - options.length;
    for (let i = 0; i < extraOptions; i++) {
      options.push("");
    }

    next();
  },

  // Check answer
  (req, res, next) => {
    const { options = [], answer } = req.body;

    if (typeof answer !== "string") {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.question.invalidAnswerType;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    if (!answer.length || answer.length >= 256) {
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
  },

  commonCheckers.next,
];

const validateAddSubmission = [
  check("quizId").isMongoId().withMessage(errors.quiz.invalidId),

  check("answers").isArray().withMessage(errors.submission.answersNotArray),
  (req, res, next) => {
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
  },

  commonCheckers.next,
];

const validateQueryId = [commonCheckers.checkMongoIdQueryParam];

const validateParamsId = [commonCheckers.checkMongoIdParam];

module.exports = {
  validateCreateLesson,
  validateGetUnitLessons,
  validateAddDocument,
  validateAddVideo,
  validateAddQuiz,
  validateAddQuestionToQuiz,
  validateQueryId,
  validateParamsId,
  validateAddSubmission,
};
