module.exports = Object.freeze({
  user: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  emailVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  password: {
    "update:own": ["*"],
  },
  level: {
    "read:any": ["*"],
  },
  grade: {
    "read:any": ["*"],
  },
  season: {
    "read:any": ["*"],
  },
  subject: {
    "read:any": ["*"],
  },
  unit: {
    "read:any": ["*"],
  },
  lesson: {
    "read:any": ["*"],
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
    "read:any": ["*"],
  },
  subscription: {
    "read:own": ["*"],
    "create:own": ["*"],
  },
});
