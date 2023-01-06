const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { videoValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

// Video APIs
router.post(
  "/add",
  videoValidator.validateAddVideo,
  auth("createAny", "video"),
  lessonsController.addVideo
);

router.get(
  "/:id/details",
  videoValidator.validateParamsId,
  lessonsController.getVideo
);

module.exports = router;
