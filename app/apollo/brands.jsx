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
query GetAllPendingPosterPostsforBrand($getAllPendingPosterPostsforBrandId: ID) {
    getAllPendingPosterPostsforBrand(id: $getAllPendingPosterPostsforBrandId) {
      title
      id
      text
      authorId
      postId
      images
      confirmed
    }
  }
`

export const COMPLETED_POSTS_FOR_BRAND = gql`
query GetAllCompletedPosterPostsforBrand($getAllCompletedPosterPostsforBrandId: ID) {
    getAllCompletedPosterPostsforBrand(id: $getAllCompletedPosterPostsforBrandId) {
      title
      id
      text
      authorId
      postId
      images
      confirmed
    }
  }
`