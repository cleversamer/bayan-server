const { clientSchema } = require("../../models/tutorial/unit.model");
const { unitsService } = require("../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.createUnit = async (req, res, next) => {
  try {
    const user = req.user;
    const { subjectId, title } = req.body;

    const unit = await unitsService.createUnit(user, subjectId, title);
    res.status(httpStatus.CREATED).json(_.pick(unit, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.getSubjectUnits = async (req, res, next) => {
  try {
    const { subjectId } = req.query;

    // Returns an object with the units and subeject video url
    const subject = await unitsService.getSubjectUnits(subjectId);

    res.status(httpStatus.OK).json(subject);
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
    const quizBody = sharedBody;
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

    res.status(httpStatus.CREATED).json(content);
  } catch (err) {
    next(err);
  }
};

module.exports.getUnitLessons = async (req, res, next) => {
  try {
    const { unitId } = req.query;
    const lessons = await unitsService.getUnitLessons(unitId);
    res.status(httpStatus.OK).json(lessons);
  } catch (err) {
    next(err);
  }
};
