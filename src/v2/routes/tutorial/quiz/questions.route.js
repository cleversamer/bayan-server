const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { questionValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.post(
  "/add",
  questionValidator.validateAddQuestionToQuiz,
  auth("createAny", "question"),
  lessonsController.addQuestionToQuiz
);

module.exports = router;
