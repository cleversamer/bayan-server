const { Router } = require("express");
const router = Router();

const authRoute = require("./user/auth.route");
const usersRoute = require("./user/users.route");

const schoolsRoute = require("./school/staff/schools.route");
const levelsRoute = require("./school/sections/levels.route");
const gradesRoute = require("./school/sections/grades.route");
const seasonsRoute = require("./school/sections/seasons.route");
const subjectsRoute = require("./school/sections/subjects.route");
const unitsRoute = require("./school/sections/units.route");

const packagesRoute = require("./subscription/packages.route");
const subscriptionsRoute = require("./subscription/subscriptions.route");

const lessonsRoute = require("./tutorial/lesson/lessons.route");
const documentsRoute = require("./tutorial/lesson/documents.route");
const videosRoute = require("./tutorial/lesson/videos.route");
const quizzesRoute = require("./tutorial/quiz/quizzes.route");
const questionsRoute = require("./tutorial/quiz/questions.route");
const submissionsRoute = require("./tutorial/quiz/submissions.route");

const userRoutes = [
  { path: "/auth", route: authRoute },
  { path: "/users", route: usersRoute },
];

const schoolRoutes = [
  { path: "/schools", route: schoolsRoute },
  { path: "/schools/levels", route: levelsRoute },
  { path: "/schools/grades", route: gradesRoute },
  { path: "/schools/seasons", route: seasonsRoute },
  { path: "/schools/subjects", route: subjectsRoute },
  { path: "/schools/units", route: unitsRoute },
];

const subscriptionRoutes = [
  { path: "/packages", route: packagesRoute },
  { path: "/subscriptions", route: subscriptionsRoute },
];

const tutorialRoutes = [
  { path: "/lessons", route: lessonsRoute },
  { path: "/documents", route: documentsRoute },
  { path: "/videos", route: videosRoute },
  { path: "/quizzes", route: quizzesRoute },
  { path: "/questions", route: questionsRoute },
  { path: "/submissions", route: submissionsRoute },
];

const routes = [
  ...userRoutes,
  ...schoolRoutes,
  ...subscriptionRoutes,
  ...tutorialRoutes,
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
