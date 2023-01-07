const commonMiddleware = require("../../common");

const validateCreateLevel = [
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkLevelTitle,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetSchoolLevels = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.next,
];

module.exports = {
  validateCreateLevel,
  validateGetSchoolLevels,
};
