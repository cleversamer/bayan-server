const { check } = require("express-validator");
const errors = require("../../../../config/errors");
const commonCheckers = require("../../common");

const validateGetUnitLessons = [commonCheckers.checkMongoIdParam];

const validateCreateLesson = [
  check("unitId").isMongoId().withMessage(errors.unit.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.lesson.invalidTitle),

  commonCheckers.next,
];

module.exports = {
  validateGetUnitLessons,
  validateCreateLesson,
};
