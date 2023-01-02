const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { server } = require("../../config/system");
const { user: validation } = require("../../config/models");
const countriesData = require("../../data/countries");

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

const verification = {
  email: {
    expiryInMins: 10,
    codeLength: validation.verificationCode.exactLength,
  },
  phone: {
    expiryInMins: 10,
    codeLength: validation.verificationCode.exactLength,
  },
  password: {
    expiryInMins: 10,
    codeLength: validation.verificationCode.exactLength,
  },
};

const userSchema = new Schema(
  {
    // The URL of user's avatar
    avatarURL: {
      type: String,
      default: "",
      trim: true,
    },
    // The full name of the user
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: validation.name.minLength,
      maxLength: validation.name.maxLength,
    },
    // The email of the user
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: validation.email.minLength,
      maxLength: validation.email.maxLength,
    },
    // The phone of the user
    phone: {
      // The full phone number (icc + nsn)
      full: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: countriesData.minPhone,
        maxlength: countriesData.maxPhone,
      },
      // The icc of user's phone
      icc: {
        type: String,
        required: true,
        trim: true,
        enum: countriesData.countries.map((c) => c.icc),
        minlength: countriesData.minICC,
        maxlength: countriesData.maxICC,
      },
      // The nsn of user's phone
      nsn: {
        type: String,
        required: true,
        trim: true,
        minLength: countriesData.minNSN,
        maxLength: countriesData.maxNSN,
      },
    },
    // The hashed password of the user
    password: {
      type: String,
      trim: true,
      default: "",
    },
    // The role of the user
    role: {
      type: String,
      enum: validation.roles,
      default: validation.roles[0],
    },
    // The email and phone verification status of the user
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
    // How user joined to the system
    authType: {
      type: String,
      enum: validation.authTypes,
      required: true,
      default: "email",
    },
    // The last login date of the user
    lastLogin: {
      type: String,
      default: new Date(),
    },
    // The email, phone, and password verification codes
    verification: {
      email: {
        code: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: String,
          default: "",
        },
      },
      phone: {
        code: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: String,
          default: "",
        },
      },
      password: {
        code: {
          type: String,
          default: "",
        },
        expiryDate: {
          type: String,
          default: "",
        },
      },
    },
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
    // To automatically write creation/update timestamps
    // Note: the update timestamp will be updated automatically
    timestamps: true,
  }
);

userSchema.methods.genAuthToken = function () {
  try {
    const body = {
      sub: this._id.toHexString(),
      email: this.email,
      phone: this.phone.full,
      password: this.password + server.PASSWORD_SALT,
    };

    return jwt.sign(body, process.env["JWT_PRIVATE_KEY"]);
  } catch (err) {
    // TODO: write the error to the database
    return "auth-token-error";
  }
};

userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
};

userSchema.methods.genCode = function (length = 4) {
  try {
    const possibleNums = Math.pow(10, length - 1);
    return Math.floor(possibleNums + Math.random() * 9 * possibleNums);
  } catch (err) {
    // TODO: write the error to the database
  }
};

userSchema.methods.updateCode = function (key) {
  try {
    const { codeLength, expiryInMins } = verification[key];

    // Generate code
    const code = this.genCode(codeLength);

    // Generate expiry date
    const mins = expiryInMins * 60 * 1000;
    const expiryDate = new Date() + mins;

    // Update email verification code
    this.verification[key] = { code, expiryDate };
  } catch (err) {
    // TODO: write the error to the database
  }
};

userSchema.methods.isMatchingCode = function (key, code) {
  try {
    return this.verification[key].code == code;
  } catch (err) {
    // TODO: write the error to the database
    return false;
  }
};

userSchema.methods.isValidCode = function (key) {
  try {
    const { expiryDate } = this.verification[key];
    const { expiryInMins } = verification[key];

    // Measure the difference between now and code's expiry date
    const diff = new Date() - new Date(expiryDate);

    // Calculate expiry mins in milliseconds
    const time = expiryInMins * 60 * 1000;

    // Return true if milliseconds are greater than the difference
    // Otherwise, return false...
    return diff <= time;
  } catch (err) {
    // TODO: write the error to the database
    return false;
  }
};

userSchema.methods.isEmailVerified = function () {
  return this.verified.email;
};

userSchema.methods.verifyEmail = function () {
  this.verified.email = true;
};

userSchema.methods.isPhoneVerified = function () {
  return this.verified.phone;
};

userSchema.methods.verifyPhone = function () {
  this.verified.phone = true;
};

userSchema.methods.comparePassword = async function (candidate) {
  try {
    return await bcrypt.compare(candidate, this.password);
  } catch (err) {
    // TODO: write the error to the database
    return false;
  }
};

userSchema.methods.updatePassword = async function (newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    this.password = hashed;
  } catch (err) {
    // TODO: write the error to the database
  }
};

userSchema.methods.updateRole = function (newRole) {
  try {
    this.role = newRole;
  } catch (err) {
    // TODO: write the error to the database
  }
};

const User = model("User", userSchema);

module.exports = {
  User,
  clientSchema,
};
