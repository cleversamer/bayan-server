const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { questionValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// TEACHER/SCHOOL ROUTES ////////////////////
router.post(
  "/add",
  questionValidator.validateAddQuestionToQuiz,
  auth("createOwn", "question"),
  lessonsController.addQuestionToQuiz
);

module.exports = router;
