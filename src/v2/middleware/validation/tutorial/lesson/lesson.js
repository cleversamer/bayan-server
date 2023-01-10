const commonMiddleware = require("../../common");

const validateGetUnitLessons = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkUnitId,
  commonMiddleware.checkSkip,
  commonMiddleware.next,
];

const validateCreateLesson = [
  commonMiddleware.checkUnitId,
  commonMiddleware.checkLessonTitle,
  commonMiddleware.next,
];

const validateGetLesson = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkLessonId,
  commonMiddleware.next,
];

module.exports = {
  validateGetUnitLessons,
  validateCreateLesson,
  validateGetLesson,
};
