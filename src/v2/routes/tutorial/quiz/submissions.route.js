const { Router } = require("express");
const router = Router();
const { lessonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.post(
  "/add",
  auth("createAny", "submission"),
  lessonValidator.validateAddSubmission
);

module.exports = router;
