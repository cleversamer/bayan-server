const commonMiddleware = require("../common");

const validateCreatePackage = [
  commonMiddleware.checkGradeId,
  commonMiddleware.checkPackageNumOfSubjects,
  commonMiddleware.checkPackagePrice,
  commonMiddleware.checkPackageMonths,
  commonMiddleware.next,
];

const validateGetGradePackages = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSchoolId,
  commonMiddleware.checkGradeId,
  commonMiddleware.checkSkip,
  commonMiddleware.next,
];

module.exports = {
  validateCreatePackage,
  validateGetGradePackages,
};
