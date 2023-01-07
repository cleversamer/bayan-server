const commonMiddleware = require("../../common");

const validateAddQuiz = [
  commonMiddleware.checkLessonId,
  commonMiddleware.checkQuizTitle,
  commonMiddleware.next,
];

const validateGetQuiz = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkQuizId,
  commonMiddleware.next,
];

module.exports = {
  validateAddQuiz,
  validateGetQuiz,
};
