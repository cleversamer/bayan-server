const commonMiddleware = require("../common");

const validateCreateGrade = [
  commonMiddleware.checkLevelId,
  commonMiddleware.checkGradeNumber,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetLevelGrades = [
  commonMiddleware.checkMongoIdQueryParam,
  commonMiddleware.next,
];

module.exports = {
  validateCreateGrade,
  validateGetLevelGrades,
};
