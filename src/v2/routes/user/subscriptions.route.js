const { Router } = require("express");
const router = Router();
const { subscriptionsController } = require("../../controllers");
const { subscriptionValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .get(
    auth("readOwn", "subscription"),
    subscriptionsController.getUserSubscriptions
  )
  .post(
    subscriptionValidator.validateCreateSubscription,
    auth("createOwn", "subscription"),
    subscriptionsController.createSubscription
  );

router.patch(
  "/toggle-active",
  subscriptionValidator.validateToggleSubscriptionActive,
  auth("updateAny", "subscription"),
  subscriptionsController.toggleSubscriptionActive
);

router.patch(
  "/toggle-subject-active",
  subscriptionValidator.validateToggleSubjectActive,
  auth("updateAny", "subscription"),
  subscriptionsController.toggleSubjectActive
);

router.patch(
  "/add-subject",
  subscriptionValidator.validateAddSubjectToSubscription,
  auth("updateAny", "subscription"),
  subscriptionsController.addSubjectToSubscription
);

router.patch(
  "/delete-subject",
  subscriptionValidator.validateDeleteSubscribedSubject,
  auth("updateAny", "subscription"),
  subscriptionsController.deleteSubscribedSubject
);

module.exports = router;
