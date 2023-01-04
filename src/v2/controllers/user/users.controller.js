const httpStatus = require("http-status");
const { clientSchema: userSchema } = require("../../models/user/user.model");
const {
  clientSchema: subscriptionSchema,
} = require("../../models/subscription/subscription.model");
const {
  emailService,
  usersService,
  subscriptionsService,
  excelService,
} = require("../../services");
const { ApiError } = require("../../middleware/apiError");
const errors = require("../../config/errors");
const success = require("../../config/success");
const _ = require("lodash");

module.exports.isAuth = async (req, res, next) => {
  try {
    const user = req.user;

    // Update user's last login date
    user.updateLastLogin();

    // Save the user to the DB
    await user.save();

    // Create the response object
    const response = _.pick(user, userSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.resendEmailOrPhoneVerificationCode =
  (key) => async (req, res, next) => {
    try {
      const user = req.user;
      const { lang } = req.query;

      // Send user's email/phone verification code
      await usersService.resendEmailOrPhoneVerificationCode(key, user, lang);

      // Create the response object
      const response = {
        ok: true,
        message: success.auth[`${key}VerificationCodeSent`],
      };

      // Send response back to the client
      res.status(httpStatus.OK).json(response);
    } catch (err) {
      next(err);
    }
  };

module.exports.verifyEmailOrPhone = (key) => async (req, res, next) => {
  try {
    const user = req.user;
    const { code } = req.body;

    // Verify user's email/phone
    const verifiedUser = await usersService.verifyEmailOrPhone(key, user, code);

    // Send response back to the client
    res.status(httpStatus.OK).json(_.pick(verifiedUser, userSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.sendForgotPasswordCode = async (req, res, next) => {
  try {
    let { emailOrPhone, sendTo, lang } = req.query;
    if (emailOrPhone.startsWith(" ")) {
      emailOrPhone = `+${emailOrPhone.trim()}`;
    }

    await usersService.sendForgotPasswordCode(emailOrPhone, sendTo, lang);

    const response = {
      ok: true,
      message:
        sendTo === "phone"
          ? success.auth.passwordResetCodeSentToPhone
          : success.auth.passwordResetCodeSentToEmail,
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.handleForgotPassword = async (req, res, next) => {
  try {
    const { emailOrPhone, code, newPassword } = req.body;

    // Reset user's password
    const updatedUser = await usersService.handleForgotPassword(
      emailOrPhone,
      code,
      newPassword
    );

    // Create the response object
    const response = {
      user: _.pick(updatedUser, userSchema),
      token: updatedUser.genAuthToken(),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    await usersService.changePassword(user, oldPassword, newPassword);

    const response = {
      user: _.pick(user, userSchema),
      token: user.genAuthToken(),
    };

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, email, phone, lang } = req.body;
    const avatar = req?.files?.avatar || null;

    const info = await usersService.updateProfile(
      lang,
      user,
      name,
      email,
      phone,
      avatar
    );

    const response = {
      user: _.pick(info.newUser, userSchema),
      changes: info.changes,
      token: info.newUser.genAuthToken(),
    };

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.subscribeToPackage = async (req, res, next) => {
  try {
    const user = req.user;
    const { packageId, subjects, paymentInfo } = req.body;

    // Subscribe the user to the package
    const newUser = await subscriptionsService.subscribeToPackage(
      user,
      packageId,
      subjects,
      paymentInfo
    );

    // Create the response object
    const response = _.pick(newUser, userSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

///////////////////////////// ADMIN /////////////////////////////
module.exports.getUserSubscriptions = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    // Find user's subscriptions
    const subscriptions = await subscriptionsService.getUserSubscriptions(
      userId,
      true
    );

    // Create the response object
    const response = {
      subscriptions: subscriptions.map((subscription) =>
        _.pick(subscription, subscriptionSchema)
      ),
    };

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { userId, name, phone, email, password } = req.body;
    const avatar = req?.files?.avatar || null;

    // Update user's profile
    const updatedUser = await usersService.updateUserProfile(
      userId,
      name,
      avatar,
      phone,
      email,
      password
    );

    // Create the response object
    const response = _.pick(updatedUser, userSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.emailOrPhoneUsed;
      err = new ApiError(statusCode, message);
    }

    next(err);
  }
};

///////////////////////////// ADMIN /////////////////////////////
module.exports.changeUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;

    // Change user's role
    const updatedUser = await usersService.changeUserRole(userId, role);

    // Create the response object
    const response = _.pick(updatedUser, userSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.findUserByEmailOrPhone = async (req, res, next) => {
  try {
    const { emailOrPhone, role } = req.query;

    // Find user with the specified email or phone
    const user = await usersService.findUserByEmailOrPhone(
      emailOrPhone,
      role,
      true
    );

    // Create the response object
    const response = _.pick(user, userSchema);

    // Send response back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.verifyUser = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Verify user's email and phone
    const updatedUser = await usersService.verifyUser(userId);

    // Create the response object
    const response = _.pick(updatedUser, userSchema);

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.exportUsersToExcel = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    // Get the path to the excel file
    const filePath = await excelService.exportUsersToExcelFile(users);

    // Create the response object
    const response = {
      fileType: "file/xlsx",
      path: filePath,
    };

    // Send response back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
