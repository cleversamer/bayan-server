const commonMiddleware = require("../../common");

const validateAddQuestionToQuiz = [
  commonMiddleware.checkQuizId,
  commonMiddleware.checkQuestionTitle,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"], false),
  commonMiddleware.checkQuestionOptions,
  commonMiddleware.checkQuestionAnswer,
  commonMiddleware.next,
];

module.exports = {
  validateAddQuestionToQuiz,
};
