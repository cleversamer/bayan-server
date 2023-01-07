const commonMiddleware = require("../../common");

const validateAddDocument = [
  commonMiddleware.checkLessonId,
  commonMiddleware.checkDocumentTitle,
  commonMiddleware.checkFile("file", ["pdf", "rar"]),
  commonMiddleware.next,
];

const validateGetDocument = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkDocumentId,
  commonMiddleware.next,
];

module.exports = {
  validateAddDocument,
  validateGetDocument,
};
