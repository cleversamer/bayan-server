const { Router } = require("express");
const router = Router();
const { seasonsController } = require("../../controllers");
const { seasonValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .get(
    seasonValidator.validateGetGradeSeasons,
    seasonsController.getGradeSeasons
  )
  .post(
    seasonValidator.validateCreateSeason,
    auth("createAny", "season"),
    seasonsController.createSeason
  );

module.exports = router;
