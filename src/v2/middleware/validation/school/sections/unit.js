const commonMiddleware = require("../../common");

const validateCreateUnit = [
  commonMiddleware.checkSubjectId,
  commonMiddleware.checkUnitTitle,
  commonMiddleware.next,
];

const validateGetSubjectUnits = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

module.exports = {
  validateCreateUnit,
  validateGetSubjectUnits,
};
