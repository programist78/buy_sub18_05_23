import { gql } from "@apollo/client";

export const ACCEPT_POSTER_POST = gql`
mutation AcceptPosterPost($posterPostId: ID) {
    acceptPosterPost(posterPostId: $posterPostId)
  }
`

export const DECLINE_POSTER_POST = gql`
mutation DeclinePosterPost($posterPostId: ID) {
    declinePosterPost(posterPostId: $posterPostId)
  }
`

export const PENDING_POSTS_FOR_BRAND = gql`
query Query($getAllPendingPosterPostsforBrandId: ID) {
  getAllPendingPosterPostsforBrand(id: $getAllPendingPosterPostsforBrandId) {
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
`

export const COMPLETED_POSTS_FOR_BRAND = gql`
query Query($getAllCompletedPosterPostsforBrandId: ID) {
  getAllCompletedPosterPostsforBrand(id: $getAllCompletedPosterPostsforBrandId) {
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
`