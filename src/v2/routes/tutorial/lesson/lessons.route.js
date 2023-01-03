const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { lessonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.get(
  "/get",
  lessonValidator.validateGetUnitLessons,
  lessonsController.getUnitLessons
);

router.post(
  "/add",
  lessonValidator.validateCreateLesson,
  auth("createAny", "lesson"),
  lessonsController.createLesson
);

router.get(
  "/:id/details",
  auth("readAny", "lesson"),
  lessonsController.getLessonById
);

module.exports = router;
