const commonMiddleware = require("../../common");

const validateAddQuiz = [
  commonMiddleware.checkLessonId,
  commonMiddleware.checkQuizTitle,
  commonMiddleware.next,
];

const validateParamsId = [
  commonMiddleware.checkMongoIdParam,
  commonMiddleware.next,
];

module.exports = {
  validateAddQuiz,
  validateParamsId,
};
