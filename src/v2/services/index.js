module.exports.authService = require("./user/auth.service");
module.exports.usersService = require("./user/users.service");

module.exports.schoolsService = require("./school/staff/schools.service");
module.exports.levelsService = require("./school/sections/levels.service");
module.exports.gradesService = require("./school/sections/grades.service");
module.exports.seasonsService = require("./school/sections/seasons.service");
module.exports.subjectsService = require("./school/sections/subjects.service");
module.exports.unitsService = require("./school/sections/units.service");

module.exports.packagesService = require("./subscription/packages.service");
module.exports.subscriptionsService = require("./subscription/subscriptions.service");

module.exports.lessonsService = require("./tutorial/lesson/lessons.service");
module.exports.documentsService = require("./tutorial/lesson/documents.service");
module.exports.videosService = require("./tutorial/lesson/videos.service");
module.exports.quizzesService = require("./tutorial/quiz/quizzes.service");
module.exports.questionsService = require("./tutorial/quiz/questions.service");
module.exports.submissionsService = require("./tutorial/quiz/submissions.service");

module.exports.emailService = require("./mail/email.service");
module.exports.googleService = require("./mail/google.service");
module.exports.excelService = require("./storage/excel.service");
