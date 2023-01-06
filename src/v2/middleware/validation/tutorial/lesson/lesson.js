const commonMiddleware = require("../../common");

const validateGetUnitLessons = [
  commonMiddleware.checkMongoIdParam,
  commonMiddleware.next,
];

const validateCreateLesson = [
  commonMiddleware.checkUnitId,
  commonMiddleware.checkLessonTitle,
  commonMiddleware.next,
];

module.exports = {
  validateGetUnitLessons,
  validateCreateLesson,
};
