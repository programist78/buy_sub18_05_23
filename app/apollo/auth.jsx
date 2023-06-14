import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($about: LoginInput) {
    loginUser(about: $about) {
      token
      user {
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
          aproveScreenshots
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
        brandDescription
        image
      }
    }
  }
`;

export const CHANGE_USER = gql`
mutation ChangeUser($about: ChangeUserInput, $changeUserId: ID) {
  changeUser(about: $about, id: $changeUserId)
}
`

export const REGISTER_USER = gql`
mutation RegisterUser($about: RegisterInput) {
  registerUser(about: $about) {
    user {
      id
      fullname
      email
      role
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
      brandDescription
      image
      socialMedia {
        instagram {
          name
          followers
        }
        tiktok {
          name
          followers
        }
        facebook {
          name
          followers
        }
        aproveScreenshots
      }
    }
    token
  }
}
`;

export const POSTER_COMPLETE_REGISTER = gql`
mutation Mutation($registerUserCompleteId: ID, $social: SocialMediaInput, $review: ReviewMediaInput, $images: [Upload]) {
  registerUserComplete(id: $registerUserCompleteId, social: $social, review: $review, images: $images) {
    user {
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
        aproveScreenshots
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
      brandDescription
      image
    }
    token
  }
}
`

export const GETUSER_BYTOKEN = gql`
  query GetUserbyToken($token: String) {
    getUserbyToken(token: $token) {
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
        aproveScreenshots
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
      brandDescription
      image
    }
  }
`;

export const SEND_CONFIRMED_EMAIL = gql`
  mutation SendConfirmedEmail($email: String!) {
    sendConfirmedEmail(email: $email)
  }
`;

export const CHANGE_STATUS = gql`
  mutation ChangeStatus($changeStatusId: ID, $confirmationCode: String) {
    changeStatus(id: $changeStatusId, confirmationCode: $confirmationCode)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword(
    $email: String
    $confirmationCode: String
    $password: String
  ) {
    forgotPassword(
      email: $email
      confirmationCode: $confirmationCode
      password: $password
    )
  }
`;

export const FORGOT_PASSWORD_SEND = gql`
  mutation ForgotPasswordSend($email: String) {
    forgotPasswordSend(email: $email)
  }
`;

export const ADD_ADMIN = gql`
  mutation AddAdmin($email: String) {
    addAdmin(email: $email)
  }
`;

export const GET_PROFILE = gql`
  query Query {
    getProfile {
      id
      fullname
      email
      role
      socialMedia {
        images
        number
        nick
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
    }
  }
`;

export const GET_ALL_PROFILES = gql`
  query GetProfiles {
    getProfiles {
      id
      fullname
      email
      role
      socialMedia {
        images
        number
        nick
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
    }
  }
`;
