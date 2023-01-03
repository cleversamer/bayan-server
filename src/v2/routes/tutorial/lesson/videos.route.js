const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { lessonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

// Video APIs
router.post(
  "/add",
  lessonValidator.validateAddVideo,
  auth("createAny", "video"),
  lessonsController.addVideo
);

router.get(
  "/:id/details",
  lessonValidator.validateParamsId,
  lessonsController.getVideo
);

module.exports = router;
