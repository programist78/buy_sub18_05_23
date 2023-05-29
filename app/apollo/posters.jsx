import { gql } from "@apollo/client/core";

export const GET_POSTS = gql`
mutation CreatePosterPost($post: PosterPostInput!, $image: [Upload]!) {
  createPosterPost(post: $post, image: $image) {
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

export const GET_ALL_PENDING_POSTS = gql`
query GetAllPendingPosterPosts($getAllPendingPosterPostsId: ID) {
  getAllPendingPosterPosts(id: $getAllPendingPosterPostsId) {
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

export const GET_ALL_COMPLETED_POSTS = gql`
query GetAllCompletedPosterPosts($getAllCompletedPosterPostsId: ID) {
  getAllCompletedPosterPosts(id: $getAllCompletedPosterPostsId) {
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

