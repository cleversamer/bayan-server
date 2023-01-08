module.exports = Object.freeze({
  user: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  school: {
    "read:any": ["*"],
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
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
  lesson: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
  document: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
  video: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
  quiz: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
  question: {
    "create:own": ["*"],
    "read:own": ["*"],
    "update:own": ["*"],
  },
});
