import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    fullname: {
      type: String
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
    role: 
      {type: String,
      required: true
    },
    socialMedia: {
      type: Array
    },
    confirmedEmail: {type: Boolean},
    confirmationCode: { type: String }, 
    avatarUrl: { type: String },
    token: { type: String },
    //for posters
    pendingPosts: {
      type: Array
    },
    completedPosts: {
      type: Array
    },
    balance: {
      type: Number
    },
    //for Brand
    brandPendingPosts: {
      type: Array
    },
    brandCompletedPosts: {
      type: Array
    },
    postPrice: {
      type: String
    },
    brandname: {
      type: String
    },
    physicalLocation: {
      type: Object
    },
    plan: { type: String, enum: ['none', 'month'], default: 'none' },
    hasTrial: { type: Boolean, default: false },
    endDate: { type: Date, default: null }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', User);