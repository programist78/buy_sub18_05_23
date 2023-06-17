import { gql } from "@apollo/client";

export const GET_BUSINESS_REGISTER = gql`
query GetBusinessRegister($argument: String, $page: String) {
    getBusinessRegister(argument: $argument, page: $page) {
      createdAt
      brandname
      address
      email
      brandDescription
    }
  }
`

export const GET_BUSINESS_REGISTER_ADDINFO = gql`
query GetBusinessRegisterwAddInfo($argument: String, $page: String) {
    getBusinessRegisterwAddInfo(argument: $argument, page: $page) {
      createdAt
      brandname
      address
      email
      brandDescription
    }
  }
`

export const GET_BUSINESS_REGISTER_NEED_ADDINFO = gql`
query GetBusinessRegisterNeedAddInfo($argument: String, $page: String) {
    getBusinessRegisterNeedAddInfo(argument: $argument, page: $page) {
      createdAt
      brandname
      address
      email
      brandDescription
    }
  }
`

export const GET_POSTER_REGISTER = gql`
query GetPosterRegister($argument: String, $page: String) {
    getPosterRegister(argument: $argument, page: $page) {
      createdAt
      fullname
      reviewMedia {
        google
        yelp
        tripadvisor
      }
      email
    }
  }
`


export const GET_POSTER_REGISTER_SIGNUP = gql`
query GetPosterRegisterwSignup($argument: String, $page: String) {
    getPosterRegisterwSignup(argument: $argument, page: $page) {
      createdAt
      fullname
      reviewMedia {
        google
        yelp
        tripadvisor
      }
      email
    }
  }
`

export const GET_POSTER_REGISTER_DETAILS = gql`
query GetPosterRegisterwDetails($argument: String, $page: String) {
    getPosterRegisterwDetails(argument: $argument, page: $page) {
      createdAt
      fullname
      reviewMedia {
        google
        yelp
        tripadvisor
      }
      email
    }
  }
`

export const GET_BUSINESS_INFO_POSTS = gql`
query GetBusinessInfoWPosts($argument: String) {
    getBusinessInfoWPosts(argument: $argument) {
      createdAt
      zipCode
      brandname
      websiteLink
      confirmed
      postPrice
    }
  }
`

export const GET_UNACCEPTED_BUSINESS_INFO_POSTS = gql`
query GetUnAcceptedBusinessInfoWPosts($argument: String) {
    getUnAcceptedBusinessInfoWPosts(argument: $argument) {
      createdAt
      zipCode
      brandname
      websiteLink
      confirmed
      postPrice
    }
  }
`

export const GET_POSTER_INFO_POSTS = gql`
query GetPosterInfoWPosts($argument: String) {
    getPosterInfoWPosts(argument: $argument) {
      createdAt
      fullname
      confirmed
      selectedSocial
      selectedReview
    }
  }
`

export const GET_ACCEPTED_POSTER_INFO_POSTS = gql`
query GetAcceptedPosterInfoWPosts($argument: String) {
    getAcceptedPosterInfoWPosts(argument: $argument) {
      createdAt
      fullname
      confirmed
      selectedSocial
      selectedReview
    }
  }
`

export const GET_UNACCEPTED_POSTER_INFO_POSTS = gql`
query GetUnAcceptedPosterInfoWPosts($argument: String) {
    getUnAcceptedPosterInfoWPosts(argument: $argument) {
      createdAt
      fullname
      confirmed
      selectedSocial
      selectedReview
    }
  }
`

export const GET_BUSINESS_WHOLE_INFO = gql`
query GetBusinesswWholeInfo($argument: String) {
    getBusinesswWholeInfo(argument: $argument) {
      createdAt
      brandname
      address
      brandCompletedPosts
      paidOut
    }
  }
`

export const GET_POSTER_WHOLE_INFO = gql`
query GetPosterwWholeInfo($argument: String) {
    getPosterwWholeInfo(argument: $argument) {
      createdAt
      fullname
      phone
      balance
      paidOut
    }
  }
`