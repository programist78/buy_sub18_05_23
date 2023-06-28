import { gql } from "@apollo/client";

export const ACCEPT_POSTER_POST = gql`
  mutation AcceptPosterPost($posterPostId: ID) {
    acceptPosterPost(posterPostId: $posterPostId)
  }
`;

export const DECLINE_POSTER_POST = gql`
  mutation DeclinePosterPost($posterPostId: ID) {
    declinePosterPost(posterPostId: $posterPostId)
  }
`;

export const PENDING_POSTS_FOR_BUSINESS = gql`
  query Query($getAllPendingPosterPostsforBusinessId: ID) {
    getAllPendingPosterPostsforBusiness(
      id: $getAllPendingPosterPostsforBusinessId
    ) {
      id
      title
      text
      authorId
      postId
      images
      confirmed
      selectedReview
      selectedSocial
    }
  }
`;

export const COMPLETED_POSTS_FOR_BUSINESS = gql`
  query Query($getAllCompletedPosterPostsforBusinessId: ID) {
    getAllCompletedPosterPostsforBusiness(
      id: $getAllCompletedPosterPostsforBusinessId
    ) {
      id
      title
      text
      authorId
      postId
      images
      confirmed
      selectedReview
      selectedSocial
    }
  }
`;

export const CHANGE_IMAGE = gql`
  mutation ChangeImage($changeImageId: ID, $image: [Upload]) {
    changeImage(id: $changeImageId, image: $image)
  }
`;

export const CHANGE_LOGO = gql`
  mutation ChangeLogo($image: [Upload], $changeLogoId: ID) {
    changeLogo(image: $image, id: $changeLogoId)
  }
`;
