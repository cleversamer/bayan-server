const { Router } = require("express");
const router = Router();
const { subjectsController } = require("../../controllers");
const { subjectValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .post(
    subjectValidator.validateCreateSubject,
    auth("createAny", "subject"),
    subjectsController.createSubject
  )
  .get(
    subjectValidator.validateGetSeasonSubjects,
    subjectsController.getSeasonSubjects
  );

router.patch(
  "/toggle-free",
  subjectValidator.validateToggleIsSubjectFree,
  auth("createAny", "freeSubject"),
  subjectsController.toggleIsSubjectFree
);

module.exports = router;
