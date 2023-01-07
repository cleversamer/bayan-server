module.exports.codes = require("./common/codes");
module.exports.system = require("./common/system");

module.exports.auth = require("./user/auth");
module.exports.user = require("./user/user");

module.exports.school = require("./school/staff/school");
module.exports.level = require("./school/sections/level");
module.exports.grade = require("./school/sections/grade");
module.exports.season = require("./school/sections/season");
module.exports.subject = require("./school/sections/subject");
module.exports.unit = require("./school/sections/unit");

module.exports.lesson = require("./tutorial/lesson/lesson");
module.exports.document = require("./tutorial/lesson/document");
module.exports.video = require("./tutorial/lesson/video");
module.exports.quiz = require("./tutorial/quiz/quiz");
module.exports.question = require("./tutorial/quiz/question");
module.exports.submission = require("./tutorial/quiz/submission");

module.exports.subscription = require("./subscription/subscription");
module.exports.package = require("./subscription/package");
