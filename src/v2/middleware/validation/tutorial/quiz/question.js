const commonCheckers = require("../../common");

const validateAddQuestionToQuiz = [
  commonCheckers.checkQuizId,
  commonCheckers.checkQuestionTitle,
  commonCheckers.checkFile("photo", ["png", "jpg", "jpeg"], false),
  commonCheckers.checkQuestionOptions,
  commonCheckers.checkQuestionAnswer,
  commonCheckers.next,
];

module.exports = {
  validateAddQuestionToQuiz,
};
