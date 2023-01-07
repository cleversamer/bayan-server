const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { quizValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.post(
  "/add",
  quizValidator.validateAddQuiz,
  auth("createAny", "quiz"),
  lessonsController.addQuiz
);

router.get(
  "/:quizId/details",
  quizValidator.validateGetQuiz,
  auth("readOwn", "quiz"),
  lessonsController.getQuiz
);

module.exports = router;
