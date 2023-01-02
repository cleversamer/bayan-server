const { Router } = require("express");
const router = Router();
const { usersController } = require("../../controllers");
const auth = require("../../middleware/auth");
const { authValidator, userValidator } = require("../../middleware/validation");

//////////////////// User: Authentication ////////////////////
router.get("/isauth", auth("readOwn", "user", true), usersController.isAuth);

//////////////////// User: Verification ////////////////////
router
  .route("/verify/email")
  .get(
    authValidator.resendCodeValidator,
    auth("readOwn", "emailVerificationCode", true),
    usersController.resendEmailOrPhoneVerificationCode("email")
  )
  .post(
    authValidator.codeValidator,
    auth("updateOwn", "emailVerificationCode", true),
    usersController.verifyEmailOrPhone("email")
  );

router
  .route("/verify/phone")
  .get(
    authValidator.resendCodeValidator,
    auth("readOwn", "phoneVerificationCode", true),
    usersController.resendEmailOrPhoneVerificationCode("phone")
  )
  .post(
    authValidator.codeValidator,
    auth("updateOwn", "phoneVerificationCode", true),
    usersController.verifyEmailOrPhone("phone")
  );

//////////////////// User: Password ////////////////////
router
  .route("/password/forgot")
  .get(
    authValidator.getForgotPasswordCode,
    usersController.sendForgotPasswordCode
  )
  .post(
    authValidator.forgotPasswordValidator,
    usersController.handleForgotPassword
  );

router.patch(
  "/password/change",
  authValidator.resetPasswordValidator,
  auth("updateOwn", "password"),
  usersController.changePassword
);

//////////////////// User: Profile ////////////////////
router.patch(
  "/profile/update",
  userValidator.validateUpdateProfile,
  auth("updateOwn", "user"),
  usersController.updateProfile
);

//////////////////// User: Subscription ////////////////////
// TODO: missing paymentInfo param
router.post(
  "/subscribe",
  userValidator.validateSubscripeToPackage,
  auth("createOwn", "subscription"),
  usersController.subscribeToPackage
);

// TODO: update query code
router.get(
  "/admin/:id/subscriptions",
  userValidator.validateGetUserSubscriptions,
  usersController.getUserSubscriptions
);

//////////////////// Admin: Profile ////////////////////
router.patch(
  "/admin/profile/update",
  userValidator.validateUpdateUserProfile,
  auth("updateAny", "user"),
  usersController.updateUserProfile
);

router.get(
  "/admin/profile/find",
  userValidator.validateFindUserByEmailOrPhone,
  auth("readAny", "user"),
  usersController.findUserByEmailOrPhone
);

router.patch(
  "/admin/profile/update-role",
  userValidator.validateUpdateUserRole,
  auth("updateAny", "user"),
  usersController.changeUserRole
);

//////////////////// Admin: Verification ////////////////////
router.patch(
  "/admin/profile/verify",
  userValidator.validateVerifyUser,
  auth("updateAny", "user"),
  usersController.verifyUser
);

//////////////////// Admin: Excel ////////////////////
router.get(
  "/admin/users/export",
  auth("readAny", "user"),
  usersController.exportUsersToExcel
);

module.exports = router;
