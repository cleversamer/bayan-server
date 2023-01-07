const { Router } = require("express");
const router = Router();
const { seasonsController } = require("../../../controllers");
const { seasonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get(
  "/get",
  seasonValidator.validateGetGradeSeasons,
  auth("readOwn", "season"),
  seasonsController.getGradeSeasons
);

//////////////////// SCHOOL ROUTES ////////////////////
router.post(
  "/add",
  seasonValidator.validateCreateSeason,
  auth("createOwn", "season"),
  seasonsController.createSeason
);

module.exports = router;
