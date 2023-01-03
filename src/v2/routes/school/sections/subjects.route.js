const { Router } = require("express");
const router = Router();
const { subjectsController } = require("../../../controllers");
const { subjectValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.get(
  "/add",
  subjectValidator.validateGetSeasonSubjects,
  subjectsController.getSeasonSubjects
);

router.post(
  "/add",
  subjectValidator.validateCreateSubject,
  auth("createAny", "subject"),
  subjectsController.createSubject
);

router.patch(
  "/:subjectId/toggle-free",
  subjectValidator.validateToggleIsSubjectFree,
  auth("createAny", "freeSubject"),
  subjectsController.toggleIsSubjectFree
);

module.exports = router;
