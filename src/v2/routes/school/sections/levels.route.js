const { Router } = require("express");
const router = Router();
const { levelsController } = require("../../../controllers");
const { levelValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.get("/get", levelsController.getAllLevels);

router.post(
  "/add",
  levelValidator.validateCreateLevel,
  auth("createAny", "level"),
  levelsController.createLevel
);

module.exports = router;
