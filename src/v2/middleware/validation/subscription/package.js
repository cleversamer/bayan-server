const commonMiddleware = require("../common");

const validateCreatePackage = [
  commonMiddleware.checkGradeId,
  commonMiddleware.checkPackageNumOfSubjects,
  commonMiddleware.checkPackagePrice,
  commonMiddleware.checkPackageMonths,
  commonMiddleware.next,
];

const validateGetGradePackages = [
  commonMiddleware.checkMongoIdQueryParam,
  commonMiddleware.next,
];

module.exports = {
  validateCreatePackage,
  validateGetGradePackages,
};
