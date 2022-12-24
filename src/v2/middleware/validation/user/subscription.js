const { check } = require("express-validator");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");

const validateCreateSubscription = [
  check("packageId").isMongoId().withMessage(errors.season.invalidId),

  commonCheckers.handler,
];

const validateToggleSubscriptionActive = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  commonCheckers.handler,
];

const validateToggleSubjectActive = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  commonCheckers.handler,
];

const validateAddSubjectToSubscription = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  commonCheckers.handler,
];

const validateDeleteSubscribedSubject = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  commonCheckers.handler,
];

module.exports = {
  validateCreateSubscription,
  validateToggleSubscriptionActive,
  validateToggleSubjectActive,
  validateAddSubjectToSubscription,
  validateDeleteSubscribedSubject,
};
