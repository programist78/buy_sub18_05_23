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
      type: Object
    },
    reviewMedia: {
      type: Object
    },
    confirmedEmail: {type: Boolean},
    confirmationCode: { type: String }, 
    avatarUrl: { type: String },
    token: { type: String },
    phone: {type: String},
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
      type: Number
    },
    brandname: {
      type: String,
      unique: true
    },
    physicalLocation: {
      type: Object
    },
    brandDirection: {
      type: String
    },
    image: {type: String},
    address: {type: String},
    websiteLink:{type: String},
    plan: { type: String, enum: ['none', 'month'], default: 'none' },
    hasTrial: { type: Boolean, default: false },
    endDate: { type: Date, default: null },
    brandDescription: {type: String}
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', User);