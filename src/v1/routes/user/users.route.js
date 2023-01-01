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
  auth("updateOwn", "password"),
  authValidator.resetPasswordValidator,
  usersController.resetPassword
);

router.patch(
  "/update",
  auth("updateOwn", "user"),
  userValidator.validateUpdateProfile,
  usersController.updateProfile
);

router
  .route("/subscriptions")
  .post(
    auth("createOwn", "subscription"),
    userValidator.validateSubscripeToPackage,
    usersController.subscribeToPackage
  );

router.get(
  "/admin/:id/subscriptions",
  userValidator.validateGetUserSubscriptions,
  usersController.getUserSubscriptions
);

router.patch(
  "/admin/update-profile",
  auth("updateAny", "user"),
  userValidator.validateUpdateUserProfile,
  usersController.updateUserProfile
);

router.patch(
  "/admin/change-user-role",
  auth("updateAny", "user"),
  userValidator.validateUpdateUserRole,
  usersController.changeUserRole
);

router.patch(
  "/admin/validate-user",
  auth("updateAny", "user"),
  userValidator.validateValidateUser,
  usersController.validateUser
);

router.get(
  "/:role/:id",
  auth("readAny", "user"),
  userValidator.validateFindUserByEmailOrPhone,
  usersController.findUserByEmailOrPhone
);

module.exports = router;
