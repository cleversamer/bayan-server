const mongoose = require("mongoose");

const clientSchema = [
  "_id",
  "userId",
  "package",
  "grade",
  "subjects",
  "active",
];

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "packages",
      required: true,
    },
    gradeId: {
      type: mongoose.Types.ObjectId,
      ref: "grades",
      required: true,
    },
    subjects: [
      {
        ref: {
          type: mongoose.Types.ObjectId,
          ref: "subjects",
        },
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: new Date(),
    },
    expiresAt: {
      type: String,
      default: () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
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

// Create an index on the `userId` field to enhance
// get user's subscriptions query
subscriptionSchema.index({ userId: 1 });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription,
  clientSchema,
};
