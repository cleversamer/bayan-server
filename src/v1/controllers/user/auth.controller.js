const { authService, emailService } = require("../../services");
const httpStatus = require("http-status");
const { ApiError } = require("../../middleware/apiError");
const { clientSchema } = require("../../models/user/user.model");
const errors = require("../../config/errors");
const _ = require("lodash");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, name, phone, authType, googleToken } = req.body;
    const user = await authService.createUser(
      email,
      password,
      name,
      phone,
      authType,
      googleToken
    );

    if (authType === "email") {
      await emailService.registerEmail(email, user);
    }

    if (!user.phone) {
      // Sending phone verification code to user's whatsapp account
    }

    const body = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    res.status(httpStatus.CREATED).json(body);
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.emailOrPhoneUsed;
      err = new ApiError(statusCode, message);
    }

    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { emailOrPhone, password, authType, googleToken } = req.body;
    const user = await authService.login(
      emailOrPhone,
      password,
      googleToken,
      authType
    );

    const body = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    res.status(httpStatus.OK).json(body);
  } catch (err) {
    next(err);
  }
};
