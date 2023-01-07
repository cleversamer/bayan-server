const { Router } = require("express");
const router = Router();
const { subjectsController } = require("../../../controllers");
const { subjectValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get(
  "/get",
  subjectValidator.validateGetSeasonSubjects,
  auth("readOwn", "subject"),
  subjectsController.getSeasonSubjects
);

//////////////////// SCHOOL ROUTES ////////////////////
router.post(
  "/add",
  subjectValidator.validateCreateSubject,
  auth("createOwn", "subject"),
  subjectsController.createSubject
);

router.patch(
  "/:subjectId/toggle-free",
  subjectValidator.validateToggleIsSubjectFree,
  auth("updateOwn", "subject"),
  subjectsController.toggleIsSubjectFree
);

module.exports = router;
