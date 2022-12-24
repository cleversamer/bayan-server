const { Router } = require("express");
const router = Router();

const authRoute = require("./user/auth.route");
const usersRoute = require("./user/users.route");
const subscriptionsRoute = require("./user/subscriptions.route");

const levelsRoute = require("./tutorial/levels.route");
const gradesRoute = require("./tutorial/grades.route");
const seasonsRoute = require("./tutorial/seasons.route");
const subjectsRoute = require("./tutorial/subjects.route");
const unitsRoute = require("./tutorial/units.route");
const lessonsRoute = require("./tutorial/lessons.route");
const packagesRoute = require("./tutorial/packages.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/levels",
    route: levelsRoute,
  },
  {
    path: "/grades",
    route: gradesRoute,
  },
  {
    path: "/seasons",
    route: seasonsRoute,
  },
  {
    path: "/subjects",
    route: subjectsRoute,
  },
  {
    path: "/units",
    route: unitsRoute,
  },
  {
    path: "/lessons",
    route: lessonsRoute,
  },
  {
    path: "/packages",
    route: packagesRoute,
  },
  {
    path: "/subscriptions",
    route: subscriptionsRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
