const mongoose = require("mongoose");
const { subscription: validation } = require("../../config/models");

const clientSchema = [
  "_id",
  "subjects",
  "active",
  "schoolId",
  "userId",
  "packageId",
  "gradeId",
];

const subscriptionSchema = new mongoose.Schema(
  {
    subjects: [
      {
        ref: {
          type: mongoose.Types.ObjectId,
          ref: "Subject",
        },
        active: {
          type: Boolean,
          default: validation.subject.active.default,
        },
      },
    ],
    active: {
      type: Boolean,
      default: validation.active.default,
    },
    date: {
      type: String,
      default: new Date(),
    },
    expiresAt: {
      type: String,
      default: () => {
        const date = new Date();
        const { defaultMonths } = validation.expiresAt;
        date.setMonth(date.getMonth() + defaultMonths);
        return date;
      },
    },
    schoolId: {
      type: mongoose.Types.ObjectId,
      ref: "School",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    gradeId: {
      type: mongoose.Types.ObjectId,
      ref: "Grade",
      required: true,
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

// Create an index on the `userId` field to enhance
// get user's subscriptions query
subscriptionSchema.index({ userId: 1 });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription,
  clientSchema,
};
