import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation LoginUser($about: LoginInput) {
    loginUser(about: $about) {
      user {
        id
        fullname
        email
        roles
      }
      token
    }
  }
`