const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { documentValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

router.post(
  "/add",
  documentValidator.validateAddDocument,
  auth("createAny", "document"),
  lessonsController.addDocumnet
);

router.get(
  "/:documentId/details",
  documentValidator.validateGetDocument,
  lessonsController.getDocumnent
);

module.exports = router;
