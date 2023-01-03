const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { lessonValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.post(
  "/add",
  lessonValidator.validateAddDocument,
  auth("createAny", "document"),
  lessonsController.addDocumnet
);

router.get(
  "/:id/details",
  lessonValidator.validateParamsId,
  lessonsController.getDocumnent
);

module.exports = router;
