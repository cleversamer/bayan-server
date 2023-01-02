const commonMiddleware = require("../common");

const validateUpdateProfile = [
  commonMiddleware.checkLanguage,
  commonMiddleware.conditionalCheck("name", commonMiddleware.checkName),
  commonMiddleware.checkFile("avatar", ["png", "jpg", "jpeg"], false),
  commonMiddleware.conditionalCheck("email", commonMiddleware.checkEmail),
  commonMiddleware.conditionalCheck("phone", commonMiddleware.checkPhone),
  commonMiddleware.next,
];

const validateUpdateUserProfile = [
  commonMiddleware.checkEmailOrPhone,
  ...validateUpdateProfile,
];

const validateSubscripeToPackage = [
  commonMiddleware.checkPackageId,
  commonMiddleware.checkSubjects,
  commonMiddleware.next,
];

const validateGetUserSubscriptions = [
  commonMiddleware.checkMongoIdParam,
  commonMiddleware.next,
];

const validateFindUserByEmailOrPhone = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkRole(true),
  commonMiddleware.next,
];

const validateUpdateUserRole = [
  commonMiddleware.checkUserId,
  commonMiddleware.checkRole(true),
  commonMiddleware.next,
];

const validateVerifyUser = [
  commonMiddleware.checkUserId,
  commonMiddleware.next,
];

////////////////////////////////////////

module.exports = {
  validateUpdateProfile,
  validateUpdateUserProfile,
  validateSubscripeToPackage,
  validateGetUserSubscriptions,
  validateFindUserByEmailOrPhone,
  validateUpdateUserRole,
  validateVerifyUser,
};
