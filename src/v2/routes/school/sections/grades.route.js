const { Router } = require("express");
const router = Router();
const { gradesController } = require("../../../controllers");
const { gradeValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.get(
  "/get",
  gradeValidator.validateGetLevelGrades,
  gradesController.getLevelGrades
);

router.post(
  "/add",
  gradeValidator.validateCreateGrade,
  auth("createAny", "grade"),
  gradesController.createGrade
);

module.exports = router;
