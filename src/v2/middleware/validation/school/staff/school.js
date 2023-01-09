const commonMiddleware = require("../../common");

const validateGetAllSchools = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSkip,
  commonMiddleware.next,
];

const validateCreateSchool = [
  commonMiddleware.checkSchoolName,
  commonMiddleware.next,
];

const validateGetInactiveSchools = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSkip,
  commonMiddleware.next,
];

const validateActivateSchool = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.next,
];

module.exports = {
  validateGetAllSchools,
  validateCreateSchool,
  validateGetInactiveSchools,
  validateActivateSchool,
};
