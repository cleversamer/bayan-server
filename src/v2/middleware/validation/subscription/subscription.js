const { check } = require("express-validator");
const errors = require("../../../config/errors");
const commonCheckers = require("../common");

const validateCreateSubscription = [
  check("packageId").isMongoId().withMessage(errors.season.invalidId),

  commonCheckers.next,
];

const validateToggleSubscriptionActive = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  commonCheckers.next,
];

const validateToggleSubjectActive = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  commonCheckers.next,
];

const validateAddSubjectToSubscription = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  commonCheckers.next,
];

const validateDeleteSubscribedSubject = [
  check("subscriptionId")
    .isMongoId()
    .withMessage(errors.subscription.invalidId),

  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  commonCheckers.next,
];

module.exports = {
  validateCreateSubscription,
  validateToggleSubscriptionActive,
  validateToggleSubjectActive,
  validateAddSubjectToSubscription,
  validateDeleteSubscribedSubject,
};
