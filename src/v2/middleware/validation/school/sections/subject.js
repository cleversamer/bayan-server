const commonMiddleware = require("../../common");

const validateCreateSubject = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkSeasonId,
  commonMiddleware.checkSubjectTitle,
  commonMiddleware.checkSubjectVideoType,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetSeasonSubjects = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkSeasonId,
  commonMiddleware.next,
];

const validateToggleIsSubjectFree = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

module.exports = {
  validateCreateSubject,
  validateGetSeasonSubjects,
  validateToggleIsSubjectFree,
};
