const {
  clientSchema: unitSchema,
} = require("../../../models/school/sections/unit.model");
const {
  clientSchema: lessonSchema,
} = require("../../../models/tutorial/lesson/lesson.model");
const {
  clientSchema: documentSchema,
} = require("../../../models/tutorial/lesson/document.model");
const {
  clientSchema: videoSchema,
} = require("../../../models/tutorial/lesson/video.model");
const {
  clientSchema: quizSchema,
} = require("../../../models/tutorial/quiz/quiz.model");
const { unitsService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.createUnit = async (req, res, next) => {
  try {
    const user = req.user;
    const { subjectId, title } = req.body;

    // Asking service to create a new unit
    const unit = await unitsService.createUnit(user, subjectId, title);

    // Genereate the response object
    const response = _.pick(unit, unitSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getSubjectUnits = async (req, res, next) => {
  try {
    const user = req.user;
    const { schoolId, subjectId } = req.query;

    // Asking service to find units
    const units = await unitsService.getSubjectUnits(user, schoolId, subjectId);

    // Genereate the response object
    const response = {
      units: units.map((unit) => _.pick(unit, unitSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.addContent = async (req, res, next) => {
  try {
    const user = req.user;
    const { unitId, type, title, documentText, videoUrl, videoDescription } =
      req.body;

    const sharedBody = { author: user._id, unitId, type, title };
    const documentBody = { ...sharedBody, text: documentText };
    const quizBody = { ...sharedBody };
    const videoBody = {
      ...sharedBody,
      url: videoUrl,
      description: videoDescription,
    };

    const contentBody =
      type === "document"
        ? documentBody
        : type === "quiz"
        ? quizBody
        : videoBody;

    const content = await unitsService.addContent(unitId, contentBody);

    const response =
      type === "document"
        ? _.pick(content, documentSchema)
        : type === "quiz"
        ? _.pick(content, quizSchema)
        : _.pick(content, videoSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getUnitLessons = async (req, res, next) => {
  try {
    const { unitId } = req.query;

    const lessons = await unitsService.getUnitLessons(unitId);

    const response = {
      lessons: lessons.map((lesson) => _.pick(lesson, lessonSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
