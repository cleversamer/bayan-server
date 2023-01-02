const { SUPPORTED_SEASONS } = require("../../../models/tutorial/season.model");
const { check } = require("express-validator");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");

const validateCreateSeason = [
  check("gradeId").isMongoId().withMessage(errors.grade.invalidId),

  check("number")
    .isIn(SUPPORTED_SEASONS)
    .withMessage(errors.season.invalidSeason),

  commonCheckers.checkFile("photo", ["png", "jpg", "jpeg"]),

  commonCheckers.next,
];

const validateGetGradeSeasons = [commonCheckers.checkMongoIdQueryParam];

module.exports = {
  validateCreateSeason,
  validateGetGradeSeasons,
};
