const { SUPPORTED_GRADES } = require("../../../models/tutorial/grade.model");
const { check } = require("express-validator");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");

const validateCreateGrade = [
  check("levelId").isMongoId().withMessage(errors.level.invalidId),

  check("number")
    .isIn(SUPPORTED_GRADES.ALL)
    .withMessage(errors.grade.invalidGrade),

  commonCheckers.checkFile("photo", ["png", "jpg", "jpeg"]),

  commonCheckers.next,
];

const validateGetLevelGrades = [commonCheckers.checkMongoIdQueryParam];

module.exports = {
  validateCreateGrade,
  validateGetLevelGrades,
};
