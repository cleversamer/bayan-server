const commonMiddleware = require("../../common");

const validateCreateGrade = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkLevelId,
  commonMiddleware.checkGradeNumber,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetLevelGrades = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkLevelId,
  commonMiddleware.checkSkip,
  commonMiddleware.next,
];

module.exports = {
  validateCreateGrade,
  validateGetLevelGrades,
};
