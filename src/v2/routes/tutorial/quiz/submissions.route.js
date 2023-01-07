const { Router } = require("express");
const router = Router();
const { submissionValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

// TODO:
router.post(
  "/add",
  auth("createAny", "submission"),
  submissionValidator.validateAddSubmission
);

module.exports = router;
