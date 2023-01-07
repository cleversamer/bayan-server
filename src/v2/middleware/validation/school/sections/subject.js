const commonMiddleware = require("../../common");

const validateCreateSubject = [
  commonMiddleware.checkSeasonId,
  commonMiddleware.checkSubjectTitle,
  commonMiddleware.checkSubjectVideoType,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetSeasonSubjects = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSeasonId,
  commonMiddleware.next,
];

const validateToggleIsSubjectFree = [
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

module.exports = {
  validateCreateSubject,
  validateGetSeasonSubjects,
  validateToggleIsSubjectFree,
};
