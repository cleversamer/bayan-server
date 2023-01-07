const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { quizValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get(
  "/:quizId/details",
  quizValidator.validateGetQuiz,
  auth("readOwn", "quiz"),
  lessonsController.getQuiz
);

//////////////////// TEACHER/SCHOOL MANAGER ROUTES ////////////////////
router.post(
  "/add",
  quizValidator.validateAddQuiz,
  auth("createOwn", "quiz"),
  lessonsController.addQuiz
);

module.exports = router;
