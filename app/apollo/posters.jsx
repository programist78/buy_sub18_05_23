import { gql } from "@apollo/client/core";

export const CREATE_POSTER_POST = gql`
mutation CreatePosterPost($post: PosterPostInput!, $image: [Upload]!) {
  createPosterPost(post: $post, image: $image) {
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

export const GET_BRAND = gql`
mutation Mutation($brandname: String) {
  getBrand(brandname: $brandname)
}
`

export const GET_BRAND_QUERY = gql`
query GetBrandQuery($brandname: String!) {
  getBrandQuery(brandname: $brandname) {
    id
    fullname
    email
    role
    socialMedia {
      instagram {
        name
        followers
      }
      facebook {
        name
        followers
      }
      tiktok {
        name
        followers
      }
    }
    reviewMedia {
      google
      yelp
      tripadvisor
    }
    confirmedEmail
    avatarUrl
    phone
    pendingPosts
    completedPosts
    balance
    brandPendingPosts
    brandCompletedPosts
    postPrice
    brandname
    physicalLocation {
      latitude
      longitude
    }
    brandDirection
    plan
    hasTrial
    endDate
    websiteLink
    address
  }
}
`

export const GET_NEW_BRANDS = gql`
query GetNewBrands {
  getNewBrands {
    avatarUrl
    postPrice
    brandname
    address
    image
  }
}
`

export const GET_POPULAR_BRANDS = gql`
query GetPopularBrands {
  getPopularBrands {
    avatarUrl
    postPrice
    brandname
    address
    image
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

