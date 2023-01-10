const commonMiddleware = require("../../common");

const validateCreateLevel = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkLevelTitle,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetSchoolLevels = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkSkip,
  commonMiddleware.next,
];

module.exports = {
  validateCreateLevel,
  validateGetSchoolLevels,
};
