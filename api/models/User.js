import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: { type: String, required: true },
    socialMedia: {
      type: Object,
    },
    reviewMedia: {
      type: Object,
    },
    confirmedEmail: { type: Boolean },
    confirmationCode: { type: String },
    avatarUrl: { type: String },
    token: { type: String },
    phone: { type: String },
    //for posters
    pendingPosts: {
      type: Array,
    },
    completedPosts: {
      type: Array,
    },
    balance: {
      type: Number,
    },
    //for Business
    brandPendingPosts: {
      type: Array,
    },
    brandCompletedPosts: {
      type: Array,
    },
    postPrice: {
      type: Number,
    },
    brandname: {
      type: String,
    },
    physicalLocation: {
      type: Object,
    },
    brandDirection: {
      type: String,
    },
    image: { type: String },
    address: { type: String },
    websiteLink: { type: String },
    plan: { type: String, enum: ["none", "month"], default: "none" },
    hasTrial: { type: Boolean, default: false },
    endDate: { type: Date, default: null },
    brandDescription: { type: String },
    zipCode: { type: String },
    paidOut: { type: Number },
    stripeAccountId: { type: String },
    ban: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
