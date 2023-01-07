const { Router } = require("express");
const router = Router();
const { gradesController } = require("../../../controllers");
const { gradeValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get(
  "/get",
  gradeValidator.validateGetLevelGrades,
  auth("readOwn", "grade"),
  gradesController.getLevelGrades
);

//////////////////// SCHOOL ROUTES ////////////////////
router.post(
  "/add",
  gradeValidator.validateCreateGrade,
  auth("createOwn", "grade"),
  gradesController.createGrade
);

module.exports = router;
