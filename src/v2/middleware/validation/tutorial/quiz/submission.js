const commonMiddleware = require("../../common");

const validateAddSubmission = [
  commonMiddleware.checkQuizId,
  commonMiddleware.checkSubmissionAnswers,
  commonMiddleware.next,
];

module.exports = {
  validateAddSubmission,
};
