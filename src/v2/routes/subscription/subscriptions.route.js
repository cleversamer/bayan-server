const { Router } = require("express");
const router = Router();
const { subscriptionsController } = require("../../controllers");
const { subscriptionValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

//////////////////// STUDENT ROUTES ////////////////////
router.get(
  "/my",
  auth("readOwn", "subscription"),
  subscriptionsController.getMySubscriptions
);

router.post(
  "/add",
  subscriptionValidator.validateCreateSubscription,
  auth("createOwn", "subscription"),
  subscriptionsController.createSubscription
);

//////////////////// SCHOOL MANAGER ROUTES ////////////////////
router.patch(
  "/:subscriptionId/toggle-active",
  subscriptionValidator.validateToggleSubscriptionActive,
  auth("updateOwn", "subscription"),
  subscriptionsController.toggleSubscriptionActive
);

router.patch(
  "/:subscriptionId/subjects/:subjectId/toggle-active",
  subscriptionValidator.validateToggleSubjectActive,
  auth("updateOwn", "subscription"),
  subscriptionsController.toggleSubjectActive
);

router.post(
  "/:subscriptionId/subjects/add",
  subscriptionValidator.validateAddSubjectToSubscription,
  auth("updateOwn", "subscription"),
  subscriptionsController.addSubjectToSubscription
);

router.delete(
  "/:subscriptionId/subjects/:subjectId/delete",
  subscriptionValidator.validateDeleteSubscribedSubject,
  auth("updateOwn", "subscription"),
  subscriptionsController.deleteSubscribedSubject
);

module.exports = router;
