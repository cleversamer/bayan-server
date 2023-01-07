const { Router } = require("express");
const router = Router();
const { unitsController } = require("../../../controllers");
const { unitValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get(
  "/get",
  unitValidator.validateGetSubjectUnits,
  auth("readOwn", "unit"),
  unitsController.getSubjectUnits
);

//////////////////// SCHOOL MANAGER/TEACHER ROUTES ////////////////////
router.post(
  "/add",
  unitValidator.validateCreateUnit,
  auth("createOwn", "unit"),
  unitsController.createUnit
);

module.exports = router;
