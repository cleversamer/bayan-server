const { Router } = require("express");
const router = Router();
const { levelsController } = require("../../../controllers");
const { levelValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get("/get", auth("readOwn", "level"), levelsController.getSchoolLevels);

//////////////////// SCHOOL ROUTES ////////////////////
router.post(
  "/add",
  levelValidator.validateCreateLevel,
  auth("createOwn", "level"),
  levelsController.createLevel
);

module.exports = router;
