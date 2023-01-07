module.exports = Object.freeze({
  user: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  emailVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  phoneVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  password: {
    "update:own": ["*"],
  },
  level: {
    "read:own": ["*"],
  },
  grade: {
    "read:own": ["*"],
  },
  season: {
    "read:own": ["*"],
  },
  subject: {
    "read:own": ["*"],
  },
  unit: {
    "read:own": ["*"],
  },
  lesson: {
    "read:own": ["*"],
  },
  document: {
    "read:own": ["*"],
  },
  video: {
    "read:own": ["*"],
  },
  quiz: {
    "read:own": ["*"],
  },
  question: {
    "read:own": ["*"],
  },
  package: {
    "read:own": ["*"],
  },
  subscription: {
    "create:own": ["*"],
    "read:own": ["*"],
  },
});
