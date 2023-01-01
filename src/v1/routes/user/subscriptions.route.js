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
    auth("createOwn", "subscription"),
    subscriptionValidator.validateCreateSubscription,
    subscriptionsController.createSubscription
  );

router.patch(
  "/toggle-active",
  auth("updateAny", "subscription"),
  subscriptionValidator.validateToggleSubscriptionActive,
  subscriptionsController.toggleSubscriptionActive
);

router.patch(
  "/toggle-subject-active",
  auth("updateAny", "subscription"),
  subscriptionValidator.validateToggleSubjectActive,
  subscriptionsController.toggleSubjectActive
);

router.patch(
  "/add-subject",
  auth("updateAny", "subscription"),
  subscriptionValidator.validateAddSubjectToSubscription,
  subscriptionsController.addSubjectToSubscription
);

router.patch(
  "/delete-subject",
  auth("updateAny", "subscription"),
  subscriptionValidator.validateDeleteSubscribedSubject,
  subscriptionsController.deleteSubscribedSubject
);

module.exports = router;
