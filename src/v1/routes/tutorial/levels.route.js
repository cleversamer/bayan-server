const { Router } = require("express");
const router = Router();
const { levelsController } = require("../../controllers");
const { levelValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .get(levelsController.getAllLevels)
  .post(
    auth("createAny", "level"),
    levelValidator.validateCreateLevel,
    levelsController.createLevel
  );

router.get(
  "/supported",
  auth("readAny", "level"),
  levelsController.getAllSupportedLevels
);

module.exports = router;
