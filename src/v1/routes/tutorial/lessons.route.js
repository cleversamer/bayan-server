const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../controllers");
const { lessonValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router.post(
  "/",
  lessonValidator.validateCreateLesson,
  auth("createAny", "lesson"),
  lessonsController.createLesson
);

router.get("/:id", auth("readAny", "lesson"), lessonsController.getLessonById);

// Lesson APIs
router.get(
  "/unit/:id",
  lessonValidator.validateGetUnitLessons,
  lessonsController.getUnitLessons
);

// Document APIs
router.post(
  "/document",
  lessonValidator.validateAddDocument,
  auth("createAny", "document"),
  lessonsController.addDocumnet
);

router.get(
  "/document/:id",
  lessonValidator.validateParamsId,
  lessonsController.getDocumnent
);

// Video APIs
router.post(
  "/video",
  lessonValidator.validateAddVideo,
  auth("createAny", "video"),
  lessonsController.addVideo
);

router.get(
  "/video/:id",
  lessonValidator.validateParamsId,
  lessonsController.getVideo
);

// Quiz APIs
router.post(
  "/quiz",
  lessonValidator.validateAddQuiz,
  auth("createAny", "quiz"),
  lessonsController.addQuiz
);

router.get(
  "/quiz/:id",
  lessonValidator.validateParamsId,
  auth("readOwn", "quiz"),
  lessonsController.getQuiz
);

// Question APIs
router
  .route("/questions")
  .post(
    lessonValidator.validateAddQuestionToQuiz,
    auth("createAny", "question"),
    lessonsController.addQuestionToQuiz
  );

// Submission APIs
router.post(
  "/submissions",
  auth("createAny", "submission"),
  lessonValidator.validateAddSubmission
);

module.exports = router;
