const { Router } = require("express");
const router = Router();
const { unitsController } = require("../../controllers");
const { unitValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .post(
    unitValidator.validateCreateUnit,
    auth("createAny", "unit"),
    unitsController.createUnit
  )
  .get(unitValidator.validateGetSubjectUnits, unitsController.getSubjectUnits);

module.exports = router;
