const { Router } = require("express");
const router = Router();
const { schoolsController } = require("../../../controllers");
const { schoolValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// MANAGER ROUTES ////////////////////
router.post(
  "/add",
  schoolValidator.validateCreateSchool,
  auth("createOwn", "school"),
  schoolsController.createSchool
);

module.exports = router;
