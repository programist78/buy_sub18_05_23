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
    //for user
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
    BrandPosts: {
      type: Array
    },
    completedBrandPosts: {
      type: Array
    },
    brandname: {
      type: String
    },
    physicalLocation: {
      type: Object
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', User);