const { Router } = require("express");
const router = Router();
const { gradesController } = require("../../controllers");
const { gradeValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .get(gradeValidator.validateGetLevelGrades, gradesController.getLevelGrades)
  .post(
    auth("createAny", "grade"),
    gradeValidator.validateCreateGrade,
    gradesController.createGrade
  );

module.exports = router;
