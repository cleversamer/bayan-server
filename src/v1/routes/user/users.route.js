const { Router } = require("express");
const router = Router();
const { usersController } = require("../../controllers");
const auth = require("../../middleware/auth");
const { authValidator, userValidator } = require("../../middleware/validation");

router.get("/isauth", auth("readOwn", "user", true), usersController.isAuth);

router
  .route("/verify")
  .get(
    auth("readOwn", "emailVerificationCode", true),
    usersController.resendEmailVerificationCode
  )
  .post(
    auth("updateOwn", "emailVerificationCode", true),
    usersController.verifyUserEmail
  );

router
  .route("/forgot-password")
  .get(authValidator.emailValidator, usersController.sendForgotPasswordCode)
  .post(
    authValidator.forgotPasswordValidator,
    usersController.handleForgotPassword
  );

router.post(
  "/reset-password",
  authValidator.resetPasswordValidator,
  auth("updateOwn", "password"),
  usersController.resetPassword
);

router.patch(
  "/update",
  userValidator.validateUpdateProfile,
  auth("updateOwn", "user"),
  usersController.updateProfile
);

router
  .route("/subscriptions")
  .post(
    userValidator.validateSubscripeToPackage,
    auth("createOwn", "subscription"),
    usersController.subscribeToPackage
  );

router.get(
  "/admin/:id/subscriptions",
  userValidator.validateGetUserSubscriptions,
  usersController.getUserSubscriptions
);

router.patch(
  "/admin/update-profile",
  userValidator.validateUpdateUserProfile,
  auth("updateAny", "user"),
  usersController.updateUserProfile
);

router.patch(
  "/admin/change-user-role",
  userValidator.validateUpdateUserRole,
  auth("updateAny", "user"),
  usersController.changeUserRole
);

router.patch(
  "/admin/validate-user",
  userValidator.validateValidateUser,
  auth("updateAny", "user"),
  usersController.validateUser
);

router.get(
  "/:role/:id",
  userValidator.validateFindUserByEmailOrPhone,
  auth("readAny", "user"),
  usersController.findUserByEmailOrPhone
);

module.exports = router;
