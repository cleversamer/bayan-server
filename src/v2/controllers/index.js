module.exports.authController = require("./user/auth.controller");
module.exports.usersController = require("./user/users.controller");

module.exports.schoolsController = require("./school/staff/schools.controller");

module.exports.levelsController = require("./school/sections/levels.controller");
module.exports.gradesController = require("./school/sections/grades.controller");
module.exports.seasonsController = require("./school/sections/seasons.controller");
module.exports.subjectsController = require("./school/sections/subjects.controller");
module.exports.unitsController = require("./school/sections/units.controller");

module.exports.packagesController = require("./subscription/packages.controller");
module.exports.subscriptionsController = require("./subscription/subscriptions.controller");

module.exports.documentsController = require("./tutorial/lesson/documents.controller");
module.exports.lessonsController = require("./tutorial/lesson/lessons.controller");
module.exports.videosController = require("./tutorial/lesson/videos.controller");

module.exports.questionsController = require("./tutorial/quiz/questions.controller");
module.exports.quizzesController = require("./tutorial/quiz/quizzes.controller");
module.exports.submissionsController = require("./tutorial/quiz/submissions.controller");
