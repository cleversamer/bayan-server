const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { videoValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
// TODO: fix bugs
router.get(
  "/:videoId/details",
  videoValidator.validateGetVideo,
  auth("readOwn", "video"),
  lessonsController.getVideo
);

//////////////////// TEACHER/SCHOOL MANAGER ROUTES ////////////////////
router.post(
  "/add",
  videoValidator.validateAddVideo,
  auth("createOwn", "video"),
  lessonsController.addVideo
);

module.exports = router;
