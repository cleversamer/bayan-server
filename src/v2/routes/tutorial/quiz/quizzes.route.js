const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { lessonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.post(
  "/add",
  lessonValidator.validateAddQuiz,
  auth("createAny", "quiz"),
  lessonsController.addQuiz
);

router.get(
  "/:id/details",
  lessonValidator.validateParamsId,
  auth("readOwn", "quiz"),
  lessonsController.getQuiz
);

module.exports = router;
