const { Router } = require("express");
const router = Router();
const { authController } = require("../../controllers");
const { authValidator } = require("../../middleware/validation");

router.post(
  "/users/register",
  authValidator.registerValidator,
  authController.register
);

router.post("/users/login", authValidator.loginValidator, authController.login);

module.exports = router;
