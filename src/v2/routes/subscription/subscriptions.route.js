const { Router } = require("express");
const router = Router();
const { subscriptionsController } = require("../../controllers");
const { subscriptionValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router.get(
  "/my",
  auth("readOwn", "subscription"),
  subscriptionsController.getUserSubscriptions
);

router.post(
  "/add",
  subscriptionValidator.validateCreateSubscription,
  auth("createOwn", "subscription"),
  subscriptionsController.createSubscription
);

router.patch(
  "/:subscriptionId/toggle-active",
  subscriptionValidator.validateToggleSubscriptionActive,
  auth("updateAny", "subscription"),
  subscriptionsController.toggleSubscriptionActive
);

router.patch(
  "/:subscriptionId/subjects/:subjectId/toggle-active",
  subscriptionValidator.validateToggleSubjectActive,
  auth("updateAny", "subscription"),
  subscriptionsController.toggleSubjectActive
);

router.post(
  "/:subscriptionId/subjects/add",
  subscriptionValidator.validateAddSubjectToSubscription,
  auth("updateAny", "subscription"),
  subscriptionsController.addSubjectToSubscription
);

router.delete(
  "/:subscriptionId/subjects/:subjectId/delete",
  subscriptionValidator.validateDeleteSubscribedSubject,
  auth("updateAny", "subscription"),
  subscriptionsController.deleteSubscribedSubject
);

module.exports = router;
