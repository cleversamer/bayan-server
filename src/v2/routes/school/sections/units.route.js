const { Router } = require("express");
const router = Router();
const { unitsController } = require("../../../controllers");
const { unitValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.get(
  "/get",
  unitValidator.validateGetSubjectUnits,
  unitsController.getSubjectUnits
);

router.post(
  "/add",
  unitValidator.validateCreateUnit,
  auth("createAny", "unit"),
  unitsController.createUnit
);

module.exports = router;
