const { check } = require("express-validator");
const errors = require("../../../../config/errors");
const commonCheckers = require("../../common");
const httpStatus = require("http-status");
const { ApiError } = require("../../../apiError");

const validateAddQuiz = [
  check("lessonId").isMongoId().withMessage(errors.lesson.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.quiz.invalidTitle),

  commonCheckers.next,
];

const validateParamsId = [commonCheckers.checkMongoIdParam];

module.exports = {
  validateAddQuiz,
  validateParamsId,
};
