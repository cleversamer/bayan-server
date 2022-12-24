const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const clientSchema = [
  "_id",
  "avatarURL",
  "phone",
  "email",
  "name",
  "role",
  "authType",
  "lastLogin",
  "verified",
  "createdAt",
];

const SUPPORTED_ROLES = ["student", "teacher", "admin"];

const AUTH_TYPES = ["email", "google"];

const userSchema = new mongoose.Schema(
  {
    avatarURL: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      default: "",
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    verified: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    authType: {
      type: String,
      enum: AUTH_TYPES,
      required: true,
      default: "email",
    },
    lastLogin: {
      type: String,
      default: "",
    },
    emailVerificationCode: {
      code: {
        type: String,
        default: "",
      },
      expiresAt: {
        type: String,
        default: "",
      },
    },
    phoneVerificationCode: {
      code: {
        type: String,
        default: "",
      },
      expiresAt: {
        type: String,
        default: "",
      },
    },
    resetPasswordCode: {
      code: {
        type: String,
        default: "",
      },
      expiresAt: {
        type: String,
        default: "",
      },
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const code = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = new Date() + 10 * 60 * 1000;
  this.emailVerificationCode = { code, expiresAt };

  next();
});

userSchema.methods.updateEmailVerificationCode = function () {
  const code = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = new Date() + 10 * 60 * 1000;
  this.emailVerificationCode = { code, expiresAt };
};

userSchema.methods.generatePasswordResetCode = function () {
  const code = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = new Date() + 10 * 60 * 1000;
  this.resetPasswordCode = { code, expiresAt };
};

userSchema.methods.verifyEmail = function () {
  this.verified.email = true;
};

userSchema.methods.genAuthToken = function () {
  const body = { sub: this._id.toHexString(), email: this.email };
  const token = jwt.sign(body, process.env["JWT_PRIVATE_KEY"], {});

  return token;
};

userSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  clientSchema,
  AUTH_TYPES,
  SUPPORTED_ROLES,
};
