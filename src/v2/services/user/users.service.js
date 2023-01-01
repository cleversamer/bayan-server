const { User } = require("../../models/user/user.model");
const httpStatus = require("http-status");
const emailService = require("./email.service");
const localStorage = require("../storage/localStorage.service");
const cloudStorage = require("../storage/cloudStorage.service");
const { ApiError } = require("../../middleware/apiError");
const errors = require("../../config/errors");
const bcrypt = require("bcrypt");

module.exports.resendEmailOrPhoneVerificationCode = async (key, user, lang) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Update user's email or phone verification code
    // Send code in a message to user's email or phone
    // Save user
    user.updateCode(key);
    await user.save();

    // Sending email or phone verification code to user's email or phone
    if (key === "email")
      await emailService.registerEmail(lang, user.email, user);

    // TODO: send phone verification code to user's phone
  } catch (err) {
    throw err;
  }
};

module.exports.verifyEmailOrPhone = async (key, user, code) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode(key, code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode(key);
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email or phone
    if (key === "email") {
      user.verifyEmail();
    } else {
      user.verifyPhone();
    }

    return await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports.sendForgotPasswordCode = async (email) => {
  try {
    // Check if user exists
    const user = await this.findUserByEmailOrPhone(email);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailNotUsed;
      throw new ApiError(statusCode, message);
    }

    // Update user's password reset code
    user.updateCode("password");

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.handleForgotPassword = async (
  emailOrPhone,
  code,
  newPassword
) => {
  try {
    // Check if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailOrPhoneNotUsed;
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode("password", code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode("password");
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Update password
    await user.updatePassword(newPassword);

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.resetPassword = async (user, newPassword) => {
  try {
    // Update user's password
    await user.updatePassword(newPassword);

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateProfile = async (
  user,
  name,
  avatar,
  phone,
  email,
  password
) => {
  try {
    const noUpdateInfo = !name && !avatar && !phone && !email && !password;
    if (noUpdateInfo) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.noUpdateInfo;
      throw new ApiError(statusCode, message);
    }

    if (avatar) {
      const localFile = await localStorage.storeFile(avatar);
      const cloudFile = await cloudStorage.uploadFile(localFile);
      await localStorage.deleteFile(localFile);
      user.avatarURL = cloudFile;
      user = await user.save();
    }

    if (name && user.name !== name) {
      user.name = name;
      user = await user.save();
    }

    if (phone && user.phone !== phone) {
      user.phone = phone;
      user.verified.phone = false;
      await user.save();
      // TODO: Sending whatsapp message with phone verification code
    }

    if (password && user.password !== password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      user.password = hashed;
      user = await user.save();
    }

    // Should be the last one
    if (email && user.email !== email) {
      user.email = email;
      user.verified.email = false;

      // Saved here because in the middleware func "save"
      // the emailVerificationCode will be updated
      user = await user.save();

      await emailService.registerEmail(email, user);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUserProfile = async (
  userId,
  name,
  avatar,
  phone,
  email,
  password
) => {
  try {
    const noUpdateInfo = !name && !avatar && !phone && !email && !password;
    if (noUpdateInfo) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.noUpdateInfo;
      throw new ApiError(statusCode, message);
    }

    let user = await this.findUserById(userId);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    if (avatar) {
      const localFile = await localStorage.storeFile(avatar);
      const cloudFile = await cloudStorage.uploadFile(localFile);
      await localStorage.deleteFile(localFile);
      user.avatarURL = cloudFile;
      await user.save();
    }

    if (name && user.name !== name) {
      user.name = name;
      user = await user.save();
    }

    if (phone && user.phone !== phone) {
      user.phone = phone;
      user.verified.phone = false;
      await user.save();
      // Sending whatsapp message with phone verification code
    }

    if (password && user.password !== password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      user.password = hashed;
      user = await user.save();
    }

    // Should be the last one
    if (email && user.email !== email) {
      user.email = email;
      user.verified.email = false;
      user = await user.save();
    }

    return user;
  } catch (err) {
    throw err;
  }
};

///////////////////////////// ADMIN /////////////////////////////
module.exports.changeUserRole = async (userId, role) => {
  try {
    // Check if user exists
    const user = await this.findUserById(userId);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Update user's role
    user.updateRole(role);

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.findUserByEmailOrPhone = async (
  emailOrPhone,
  role = "",
  withError = false
) => {
  try {
    // Find a user with the specified email or phone
    const user = await User.findOne({
      $or: [{ email: { $eq: emailOrPhone } }, { phone: { $eq: emailOrPhone } }],
    });

    // Check if user exists or exist with another role
    const notFound = !user || (user && role && user.role !== role);
    if (withError && notFound) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyUser = async (userId) => {
  try {
    // Check if user exists
    const user = await this.findUserById(userId);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if user is already verified
    if (user.isEmailVerified() && user.isPhoneVerified()) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.alreadyVerified;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email
    user.verifyEmail();

    // Verify user's password
    user.verifyPassword();

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw err;
  }
};
