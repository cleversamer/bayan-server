const commonMiddleware = require("../../common");

const validateAddDocument = [
  commonMiddleware.checkLessonId,
  commonMiddleware.checkDocumentTitle,
  commonMiddleware.checkFile("file", ["pdf", "rar"]),
  commonMiddleware.next,
];

const validateParamsId = [
  commonMiddleware.checkMongoIdParam,
  commonMiddleware.next,
];

module.exports = {
  validateAddDocument,
  validateParamsId,
};
