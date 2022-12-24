const { Router } = require("express");
const router = Router();
const { lessonsController } = require("../../controllers");
const { lessonValidator } = require("../../middleware/validation");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [auth("createAny", "lesson"), lessonValidator.validateCreateLesson],
  lessonsController.createLesson
);

router.get(
  "/:id",
  [auth("readAny", "lesson")],
  lessonsController.getLessonById
);

// Lesson APIs
router.get(
  "/unit/:id",
  [lessonValidator.validateGetUnitLessons],
  lessonsController.getUnitLessons
);

// Document APIs
router.post(
  "/document",
  [auth("createAny", "document"), lessonValidator.validateAddDocument],
  lessonsController.addDocumnet
);

router.get(
  "/document/:id",
  [lessonValidator.validateParamsId],
  lessonsController.getDocumnent
);

// Video APIs
router.post(
  "/video",
  [auth("createAny", "video"), lessonValidator.validateAddVideo],
  lessonsController.addVideo
);

router.get(
  "/video/:id",
  [lessonValidator.validateParamsId],
  lessonsController.getVideo
);

// Quiz APIs
router.post(
  "/quiz",
  [auth("createAny", "quiz"), lessonValidator.validateAddQuiz],
  lessonsController.addQuiz
);

router.get(
  "/quiz/:id",
  [(auth("readOwn", "quiz"), lessonValidator.validateParamsId)],
  lessonsController.getQuiz
);

// Question APIs
router
  .route("/questions")
  .post(
    [auth("createAny", "question"), lessonValidator.validateAddQuestionToQuiz],
    lessonsController.addQuestionToQuiz
  );

// Submission APIs
router.post("/submissions", [
  auth("createAny", "submission"),
  lessonValidator.validateAddSubmission,
]);

module.exports = router;
