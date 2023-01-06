const { check } = require("express-validator");
const errors = require("../../../../config/errors");
const commonCheckers = require("../../common");
const httpStatus = require("http-status");
const { ApiError } = require("../../../apiError");

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

module.exports = {
  validateAddSubmission,
};
