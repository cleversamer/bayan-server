const commonMiddleware = require("../common");

const validateCreateLevel = [
  commonMiddleware.checkLevelTitle,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetLevelGrades = [commonMiddleware.checkMongoIdQueryParam];

module.exports = {
  validateCreateLevel,
  validateGetLevelGrades,
};
