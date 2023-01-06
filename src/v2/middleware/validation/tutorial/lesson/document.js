const { check } = require("express-validator");
const errors = require("../../../../config/errors");
const commonCheckers = require("../../common");

const validateAddDocument = [
  check("lessonId").isMongoId().withMessage(errors.lesson.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.document.invalidTitle),

  commonCheckers.checkFile("file", ["pdf", "rar"]),

  commonCheckers.next,
];

const validateParamsId = [commonCheckers.checkMongoIdParam];

module.exports = {
  validateAddDocument,
  validateParamsId,
};
