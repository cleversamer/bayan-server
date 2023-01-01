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
    auth("createAny", "package"),
    packageValidator.validateCreatePackage,
    packagesController.createPackage
  );

module.exports = router;
