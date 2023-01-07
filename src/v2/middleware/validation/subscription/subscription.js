const commonMiddleware = require("../common");

const validateCreateSubscription = [
  commonMiddleware.checkPackageId,
  commonMiddleware.checkSubjects,
  commonMiddleware.next,
];

const validateToggleSubscriptionActive = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSubscriptionId,
  commonMiddleware.next,
];

const validateToggleSubjectActive = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSubscriptionId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

const validateAddSubjectToSubscription = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSubscriptionId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

const validateDeleteSubscribedSubject = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkSubscriptionId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

module.exports = {
  validateCreateSubscription,
  validateToggleSubscriptionActive,
  validateToggleSubjectActive,
  validateAddSubjectToSubscription,
  validateDeleteSubscribedSubject,
};
