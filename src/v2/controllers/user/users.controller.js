const httpStatus = require("http-status");
const { clientSchema } = require("../../models/user/user.model");
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
const bcrypt = require("bcrypt");

module.exports.isAuth = async (req, res, next) => {
  try {
    const user = req.user;

    user.lastLogin = new Date();
    await user.save();

    res.status(httpStatus.OK).json(_.pick(req.user, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.verifyUserEmail = async (req, res, next) => {
  try {
    const { code } = req.body;
    const user = req.user;

    if (user.verified.email) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.alreadyVerified;
      throw new ApiError(statusCode, message);
    }

    if ((!code && code != 0) || code.toString().length !== 4) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.invalidCode;
      throw new ApiError(statusCode, message);
    }

    if (user.emailVerificationCode.code == code) {
      const diff = new Date() - new Date(user.emailVerificationCode.expiresAt);
      const condition = diff < 10 * 60 * 1000;
      if (!condition) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errors.auth.expiredCode;
        throw new ApiError(statusCode, message);
      }

      user.verifyEmail();
      const verifiedUser = await user.save();

      return res.status(httpStatus.OK).json(_.pick(verifiedUser, clientSchema));
    }

    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.auth.incorrectCode;
    throw new ApiError(statusCode, message);
  } catch (err) {
    next(err);
  }
};

module.exports.resendEmailVerificationCode = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.verified.email) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.alreadyVerified;
      throw new ApiError(statusCode, message);
    }

    user.updateEmailVerificationCode();
    await user.save();

    await emailService.registerEmail(user.email, user);

    res
      .status(httpStatus.OK)
      .json({ ok: true, message: success.auth.emailVerificationCodeSent });
  } catch (err) {
    next(err);
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const user = req.user;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    user.password = hashed;
    await user.save();

    res.status(httpStatus.CREATED).json(_.pick(user, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.sendForgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await usersService.findUserByEmailOrPhone(email);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailNotUsed;
      throw new ApiError(statusCode, message);
    }

    user.generatePasswordResetCode();
    const updatedUser = await user.save();

    await emailService.forgotPasswordEmail(email, updatedUser);

    res
      .status(httpStatus.OK)
      .json({ ok: true, message: success.auth.passwordResetCodeSent });
  } catch (err) {
    next(err);
  }
};

module.exports.handleForgotPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await usersService.findUserByEmailOrPhone(email);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailNotUsed;
      throw new ApiError(statusCode, message);
    }

    if ((!code && code != 0) || code.toString().length !== 4) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.invalidCode;
      throw new ApiError(statusCode, message);
    }

    if (user.resetPasswordCode.code == code) {
      const diff = new Date() - new Date(user.resetPasswordCode.expiresAt);
      const condition = diff < 10 * 60 * 1000;
      if (!condition) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errors.auth.expiredCode;
        throw new ApiError(statusCode, message);
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(newPassword, salt);
      user.password = hashed;
      await user.save();

      const body = {
        user: _.pick(user, clientSchema),
        token: user.genAuthToken(),
      };

      return res.status(httpStatus.OK).json(body);
    }

    const statusCode = httpStatus.BAD_REQUEST;
    const message = errors.auth.incorrectCode;
    throw new ApiError(statusCode, message);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const { name, phone, email, password } = req.body;
    const avatar = req?.files?.avatar || null;

    const newUser = await usersService.updateProfile(
      user,
      name,
      avatar,
      phone,
      email,
      password
    );

    const body = {
      user: _.pick(newUser, clientSchema),
      token: newUser.genAuthToken(),
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

module.exports.subscribeToPackage = async (req, res, next) => {
  try {
    const user = req.user;
    const { packageId, subjects, paymentInfo } = req.body;

    const newUser = await subscriptionsService.subscribeToPackage(
      user,
      packageId,
      subjects,
      paymentInfo
    );

    res.status(httpStatus.CREATED).json(_.pick(newUser, clientSchema));
  } catch (err) {
    next(err);
  }
};

///////////////////////////// ADMIN /////////////////////////////
module.exports.getUserSubscriptions = async (req, res, next) => {
  try {
    const { id: userId } = req.params;

    const subscriptions = await subscriptionsService.getUserSubscriptions(
      userId,
      true
    );

    res.status(httpStatus.OK).json(subscriptions);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { userId, name, phone, email, password } = req.body;
    const avatar = req?.files?.avatar || null;

    const updatedUser = await usersService.updateUserProfile(
      userId,
      name,
      avatar,
      phone,
      email,
      password
    );

    res.status(httpStatus.CREATED).json(_.pick(updatedUser, clientSchema));
  } catch (err) {
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.emailOrPhoneUsed;
      err = new ApiError(statusCode, message);
    }

    next(err);
  }
};

module.exports.validateUser = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const updatedUser = await usersService.validateUser(userId);

    res.status(httpStatus.CREATED).json(_.pick(updatedUser, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.changeUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;

    const updatedUser = await usersService.changeUserRole(userId, role);

    res.status(httpStatus.CREATED).json(_.pick(updatedUser, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.findUserByEmailOrPhone = async (req, res, next) => {
  try {
    // This is come from `req.params` but added to `req.body`
    // in the validation middleware.
    // GET requests does not accept body data.
    const { emailOrPhone, role } = req.body;

    const user = await usersService.findUserByEmailOrPhone(
      emailOrPhone,
      role,
      true
    );

    res.status(httpStatus.OK).json(_.pick(user, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.exportUsersToExcel = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    const filePath = await excelService.exportUsersToExcelFile(users);

    const response = {
      fileType: "file/xlsx",
      path: filePath,
    };

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
