const { check } = require("express-validator");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");

const validateCreateLevel = [
  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.level.invalidTitle),

  commonCheckers.checkFile("photo", ["png", "jpg", "jpeg"]),

  commonCheckers.handler,
];

const validateGetLevelGrades = [commonCheckers.checkMongoIdQueryParam];

module.exports = {
  validateCreateLevel,
  validateGetLevelGrades,
};
