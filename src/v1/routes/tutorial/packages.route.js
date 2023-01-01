const { Router } = require("express");
const router = Router();
const { packagesController } = require("../../controllers");
const { packageValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router
  .route("/")
  .get(
    packageValidator.validateGetGradePackages,
    packagesController.getGradePackages
  )
  .post(
    packageValidator.validateCreatePackage,
    auth("createAny", "package"),
    packagesController.createPackage
  );

module.exports = router;
