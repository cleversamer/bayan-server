const { Router } = require("express");
const router = Router();
const { unitsController } = require("../../controllers");
const { unitValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .post(
    auth("createAny", "unit"),
    unitValidator.validateCreateUnit,
    unitsController.createUnit
  )
  .get(unitValidator.validateGetSubjectUnits, unitsController.getSubjectUnits);

module.exports = router;
