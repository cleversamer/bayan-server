const { User } = require("../../models/user/user.model");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const emailService = require("./email.service");
const localStorage = require("../storage/localStorage.service");
const cloudStorage = require("../storage/cloudStorage.service");
const { ApiError } = require("../../middleware/apiError");
const errors = require("../../config/errors");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports.findUserByEmailOrPhone = async (
  emailOrPhone,
  role = "",
  withError = false
) => {
  try {
    const user = await User.findOne({
      $or: [{ email: { $eq: emailOrPhone } }, { phone: { $eq: emailOrPhone } }],
    });

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

module.exports.findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (err) {
    throw err;
  }
};

module.exports.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env["JWT_PRIVATE_KEY"]);
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

///////////////////////////// ADMIN /////////////////////////////
module.exports.changeUserRole = async (userId, role) => {
  try {
    const user = await this.findUserById(userId);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    user.role = role;
    return await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports.validateUser = async (userId) => {
  try {
    const user = await this.findUserById(userId);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    user.verified.email = true;
    user.verified.phone = true;
    return await user.save();
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

module.exports.getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw err;
  }
};
