const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { lessonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get(
  "/get",
  lessonValidator.validateGetUnitLessons,
  auth("readOwn", "lesson"),
  lessonsController.getUnitLessons
);

router.get(
  "/:lessonId/details",
  lessonValidator.validateGetLesson,
  auth("readOwn", "lesson"),
  lessonsController.getLessonById
);

//////////////////// TEACHER/SCHOOl ROUTES ////////////////////
router.post(
  "/add",
  lessonValidator.validateCreateLesson,
  auth("createOwn", "lesson"),
  lessonsController.createLesson
);

module.exports = router;
