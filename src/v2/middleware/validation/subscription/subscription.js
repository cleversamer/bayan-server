const commonMiddleware = require("../common");

const validateCreateSubscription = [
  commonMiddleware.checkPackageId,
  commonMiddleware.next,
];

const validateToggleSubscriptionActive = [
  commonMiddleware.checkSubscriptionId,
  commonMiddleware.next,
];

const validateToggleSubjectActive = [
  commonMiddleware.checkSubscriptionId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

const validateAddSubjectToSubscription = [
  commonMiddleware.checkSubscriptionId,
  commonMiddleware.checkSubjectId,
  commonMiddleware.next,
];

const validateDeleteSubscribedSubject = [
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
