const { Router } = require("express");
const router = Router();
const { authController } = require("../../controllers");
const { authValidator } = require("../../middleware/validation");

router.post(
  "/register",
  authValidator.registerValidator,
  authController.register
);

router.post("/login", authValidator.loginValidator, authController.login);

module.exports = router;
