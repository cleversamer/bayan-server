const { authService, emailService } = require("../../services");
const httpStatus = require("http-status");
const { clientSchema } = require("../../models/user/user.model");
const _ = require("lodash");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, name, phone, authType, googleToken } = req.body;

    // Create the user
    const user = await authService.createUser(
      email,
      password,
      name,
      phone,
      authType,
      googleToken
    );

    // Send a mail to user's email registering using an email
    if (authType === "email") {
      await emailService.registerEmail(email, user);
    }

    // TODO: always send phone verification code to user's phone

    // Create the response object
    const response = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { emailOrPhone, password, authType, googleToken } = req.body;

    // Find a user either with email and password or with a google token
    const user = await authService.login(
      emailOrPhone,
      password,
      googleToken,
      authType
    );

    // Create the response object
    const response = {
      user: _.pick(user, clientSchema),
      token: user.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
