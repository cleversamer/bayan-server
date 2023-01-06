const commonMiddleware = require("../../common");

const validateCreateUnit = [
  commonMiddleware.checkSubjectId,
  commonMiddleware.checkUnitTitle,
  commonMiddleware.next,
];

const validateGetSubjectUnits = [
  commonMiddleware.checkMongoIdQueryParam,
  commonMiddleware.next,
];

module.exports = {
  validateCreateUnit,
  validateGetSubjectUnits,
};
