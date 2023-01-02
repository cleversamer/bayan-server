const passport = require("passport");
const { ApiError } = require("./apiError");
const httpStatus = require("http-status");
const errors = require("../config/errors");
const roles = require("../config/roles");

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
  // Check if there's an error
  // Or if no user found
  if (err || !user) {
    const statusCode = httpStatus.UNAUTHORIZED;
    const message = errors.auth.invalidToken;
    return reject(new ApiError(statusCode, message));
  }

  // Add user to the `req` object
  req.user = user;

  // Check if the email verification is skipped
  const requireNoVerified = rights[2];
  if (!requireNoVerified && !user.isPhoneVerified()) {
    const statusCode = httpStatus.FORBIDDEN;
    const message = errors.auth.phoneNotVerified;
    return reject(new ApiError(statusCode, message));
  }

  // Check if there are specified rights to be checked
  if (rights.length) {
    const action = rights[0];
    const resource = rights[1];
    const permission = roles.can(req.user.role)[action](resource);

    // Check if user's role is authorized
    if (!permission.granted) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.auth.hasNoRights;
      return reject(new ApiError(statusCode, message));
    }

    // Append permissions to the response object
    res.locals.permission = permission;
  }

  // Resolve the promise in case of:
  // 1. There are no rights required
  // 2. There are rights required and user's role is authorized.
  resolve();
};

const auth = (...rights) => {
  return async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject, rights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
};

module.exports = auth;
