const { check } = require("express-validator");
const errors = require("../../../../config/errors");
const commonCheckers = require("../../common");
const httpStatus = require("http-status");
const { ApiError } = require("../../../apiError");

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

module.exports = {
  validateAddQuestionToQuiz,
};
