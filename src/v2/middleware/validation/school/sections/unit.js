const commonMiddleware = require("../../common");

const validateCreateUnit = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.checkUnitTitle,
  commonMiddleware.next,
];

const validateGetSubjectUnits = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

module.exports = {
  validateCreateUnit,
  validateGetSubjectUnits,
};
