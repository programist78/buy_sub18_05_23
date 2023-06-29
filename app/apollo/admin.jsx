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
`;

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
`;

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
`;

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
`;

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
`;

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
`;

export const GET_BUSINESS_INFO_POSTS = gql`
  query GetBusinessInfoWPosts($argument: String, $page: String) {
    getBusinessInfoWPosts(argument: $argument, page: $page) {
      createdAt
      zipCode
      brandname
      websiteLink
      confirmed
      postPrice
    }
  }
`;

export const GET_ACCEPTED_BUSINESS_INFO_POSTS = gql`
  query GetAcceptedBusinessInfoWPosts($argument: String, $page: String) {
    getAcceptedBusinessInfoWPosts(argument: $argument, page: $page) {
      createdAt
      zipCode
      brandname
      websiteLink
      confirmed
      postPrice
    }
  }
`;

export const GET_UNACCEPTED_BUSINESS_INFO_POSTS = gql`
  query GetUnAcceptedBusinessInfoWPosts($argument: String, $page: String) {
    getUnAcceptedBusinessInfoWPosts(argument: $argument, page: $page) {
      createdAt
      zipCode
      brandname
      websiteLink
      confirmed
      postPrice
    }
  }
`;

export const GET_POSTER_INFO_POSTS = gql`
  query GetPosterInfoWPosts($argument: String, $page: String) {
    getPosterInfoWPosts(argument: $argument, page: $page) {
      createdAt
      fullname
      confirmed
      selectedSocial
      selectedReview
    }
  }
`;

export const GET_ACCEPTED_POSTER_INFO_POSTS = gql`
  query GetAcceptedPosterInfoWPosts($argument: String, $page: String) {
    getAcceptedPosterInfoWPosts(argument: $argument, page: $page) {
      createdAt
      fullname
      confirmed
      selectedSocial
      selectedReview
    }
  }
`;

export const GET_UNACCEPTED_POSTER_INFO_POSTS = gql`
  query GetUnAcceptedPosterInfoWPosts($argument: String, $page: String) {
    getUnAcceptedPosterInfoWPosts(argument: $argument, page: $page) {
      createdAt
      fullname
      confirmed
      selectedSocial
      selectedReview
    }
  }
`;

export const GET_BUSINESS_WHOLE_INFO = gql`
  query GetBusinesswWholeInfo($argument: String, $page: String) {
    getBusinesswWholeInfo(argument: $argument, page: $page) {
      createdAt
      brandname
      address
      brandCompletedPosts
      paidOut
      email
      phone
      postPrice
      websiteLink
    }
  }
`;

export const GET_POSTER_WHOLE_INFO = gql`
  query GetPosterwWholeInfo($page: String, $argument: String) {
    getPosterwWholeInfo(page: $page, argument: $argument) {
      createdAt
      fullname
      phone
      balance
      paidOut
      email
      completedPosts
      pendingPosts
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
        twitter {
          name
          followers
        }
        aproveScreenshots
      }
      reviewMedia {
        google
        yelp
        tripadvisor
      }
    }
  }
`;

export const BAN_USER = gql`
  mutation Mutation($email: String, $text: String) {
    banUser(email: $email, text: $text)
  }
`;

export const UN_BAN_USER = gql`
mutation Mutation($email: String, $text: String) {
  unBanUser(email: $email, text: $text)
}
`;