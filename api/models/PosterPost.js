import mongoose from 'mongoose';

const PosterPost = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
      required: true
    },
    authorId: {
        type: String,
        required: true,
    },
    brandId: {
        type: String,
        required: true
    },
    selectedSocial:{
      type: String, 
      required: true
    },
    selectedReview:{
      type: String, 
      required: true
    },
    images: {
        type: Array
    },
    confirmed: {type: Boolean}
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('PosterPost', PosterPost);