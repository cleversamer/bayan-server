const commonMiddleware = require("../../common");

const validateCreateSeason = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkGradeId,
  commonMiddleware.checkkSeasonNumber,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetGradeSeasons = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkGradeId,
  commonMiddleware.next,
];

module.exports = {
  validateCreateSeason,
  validateGetGradeSeasons,
};
