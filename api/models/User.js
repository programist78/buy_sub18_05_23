import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    fullname: {
      type: String
    },
    nickname: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: String
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
    posts: {
      type: Array
    },
    completedPosts: {
      type: Array
    },
    confirmedEmail: {type: Boolean},
    confirmationCode: { type: String }, 
    avatarUrl: { type: String },
    token: { type: String }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', User);