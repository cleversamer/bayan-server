const commonCheckers = require("../../common");

const validateAddSubmission = [
  commonCheckers.checkQuizId,
  commonCheckers.checkSubmissionAnswers,
  commonCheckers.next,
];

module.exports = {
  validateAddSubmission,
};
