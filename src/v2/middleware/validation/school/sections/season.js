const commonMiddleware = require("../../common");

const validateCreateSeason = [
  commonMiddleware.checkGradeId,
  commonMiddleware.checkkSeasonNumber,
  commonMiddleware.checkFile("photo", ["png", "jpg", "jpeg"]),
  commonMiddleware.next,
];

const validateGetGradeSeasons = [
  commonMiddleware.checkMongoIdQueryParam,
  commonMiddleware.next,
];

module.exports = {
  validateCreateSeason,
  validateGetGradeSeasons,
};
