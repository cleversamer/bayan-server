const { Router } = require("express");
const router = Router();
const { subjectsController } = require("../../controllers");
const { subjectValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .post(
    [auth("createAny", "subject"), subjectValidator.validateCreateSubject],
    subjectsController.createSubject
  )
  .get(
    [subjectValidator.validateGetSeasonSubjects],
    subjectsController.getSeasonSubjects
  );

router.patch(
  "/toggle-free",
  [
    auth("createAny", "freeSubject"),
    subjectValidator.validateToggleIsSubjectFree,
  ],
  subjectsController.toggleIsSubjectFree
);

module.exports = router;
