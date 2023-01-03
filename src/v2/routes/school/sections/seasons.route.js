const { Router } = require("express");
const router = Router();
const { seasonsController } = require("../../../controllers");
const { seasonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.get(
  "/get",
  seasonValidator.validateGetGradeSeasons,
  seasonsController.getGradeSeasons
);

router.post(
  "/add",
  seasonValidator.validateCreateSeason,
  auth("createAny", "season"),
  seasonsController.createSeason
);

module.exports = router;
