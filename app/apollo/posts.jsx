import { gql } from "@apollo/client/core";

export const GET_POSTS = gql`
query Query($tag: String) {
  getAllPosts(tag: $tag) {
    _id
    title
    pretitle
    text
    images
    tags
    updatedAt
  }
}
`;

export const GET_ONE_POST = gql`
query GetPost($getPostId: ID) {
  getPost(id: $getPostId) {
    _id
    title
    pretitle
    text
    images
    tags
    updatedAt
  }
}
`
export const GET_TAGS = gql`
query Query {
  getTags
}
`

export const DELETE_POST = gql`
mutation Mutation($deletePostId: ID) {
  deletePost(id: $deletePostId)
}
`

export const CREATE_POST = gql`
mutation CreatePost($file: [Upload]!, $post: PostInput) {
  createPost(file: $file, post: $post) {
    _id
    title
    pretitle
    text
    images
    tags
    updatedAt
  }
}
`

export const UPDATE_POST = gql`
mutation UpdatePost($updatePostId: ID, $post: PostChangeInput, $file: [Upload]) {
  updatePost(id: $updatePostId, post: $post, file: $file) {
    _id
    title
    pretitle
    text
    images
    tags
    updatedAt
  }
}
`