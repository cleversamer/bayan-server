module.exports.authValidator = require("./user/auth");
module.exports.userValidator = require("./user/user");

module.exports.levelValidator = require("./school/sections/level");
module.exports.gradeValidator = require("./school/sections/grade");
module.exports.seasonValidator = require("./school/sections/season");
module.exports.subjectValidator = require("./school/sections/subject");
module.exports.unitValidator = require("./school/sections/unit");
module.exports.lessonValidator = require("./tutorial/lesson/lesson");
module.exports.videoValidator = require("./tutorial/lesson/video");
module.exports.documentValidator = require("./tutorial/lesson/document");
module.exports.quizValidator = require("./tutorial/quiz/quiz");
module.exports.questionValidator = require("./tutorial/quiz/question");
module.exports.submissionValidator = require("./tutorial/quiz/submission");

module.exports.subscriptionValidator = require("./subscription/subscription");
module.exports.packageValidator = require("./subscription/package");
