const { Router } = require("express");
const router = Router();
const { packagesController } = require("../../controllers");
const { packageValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

//////////////////// STUDENT/TEACHER/SCHOOL MANAGER ROUTES ////////////////////
router.get(
  "/get",
  packageValidator.validateGetGradePackages,
  auth("readOwn", "package"),
  packagesController.getGradePackages
);

//////////////////// SCHOOL MANAGER ROUTES ////////////////////
router.post(
  "/add",
  packageValidator.validateCreatePackage,
  auth("createOwn", "package"),
  packagesController.createPackage
);

module.exports = router;
