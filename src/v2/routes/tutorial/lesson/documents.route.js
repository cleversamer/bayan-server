const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../../controllers");
const { documentValidator } = require("../../../middleware/validation");
const auth = require("../../../middleware/auth");

//////////////////// STUDENT/TEACHER ROUTES ////////////////////
router.get(
  "/:documentId/details",
  documentValidator.validateGetDocument,
  auth("readOwn", "document"),
  lessonsController.getDocumnent
);

//////////////////// TEACHER/SCHOOL MANAGER ROUTES ////////////////////
router.post(
  "/add",
  documentValidator.validateAddDocument,
  auth("createOwn", "document"),
  lessonsController.addDocumnet
);

module.exports = router;
