const { Router } = require("express");
const router = Router();
const { schoolsController } = require("../../../controllers");
const { schoolValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER/MANAGER ROUTES ////////////////////
router.get(
  "/get",
  schoolValidator.validateGetAllSchools,
  auth("readAny", "school"),
  schoolsController.getAllSchools
);

//////////////////// MANAGER ROUTES ////////////////////
router.post(
  "/add",
  schoolValidator.validateCreateSchool,
  auth("createOwn", "school"),
  schoolsController.createSchool
);

//////////////////// ADMIN ROUTES ////////////////////
router.get(
  "/inactive/get",
  schoolValidator.validateGetInactiveSchools,
  auth("updateAny", "school"),
  schoolsController.getInActiveSchools
);

router.patch(
  "/:schoolId/activate",
  schoolValidator.validateActivateSchool,
  auth("updateAny", "school"),
  schoolsController.activateSchool
);

module.exports = router;
