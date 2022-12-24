const { check } = require("express-validator");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");

const validateCreateUnit = [
  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.subject.invalidTitle),

  commonCheckers.handler,
];

const validateGetSubjectUnits = [commonCheckers.checkMongoIdQueryParam];

module.exports = {
  validateCreateUnit,
  validateGetSubjectUnits,
};
