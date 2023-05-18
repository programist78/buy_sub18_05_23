// import singleTypeDefs from ''

const typeDefs = `#graphql
  scalar Upload
  type File {
    url: [String]
  }
  enum Role {
  USER
  BUSINESS
  ADMIN
  }

  type FileUploadResponse {
  ETag: String!
  Location: String!
  key: String!
  Key: String!
  Bucket: String
  }

  type SocialMedia {
    name: String
    link: String
  }


  type User{
    id: ID
    fullname: String
    nickname: String
    email: String
    balance: String
    role: String
    socialMedia: SocialMedia
    posts: [String]
    completedPosts: [String]
    avatarUrl: String
    confirmedEmail: Boolean
  }
  type AuthPayload {
    user: User
    token: String
  }

  type BusinessPost {
    title: String
    imageUrl: String
  }

  type Query {
  getAllBusinessPosts: [BusinessPost]
  }

  type Image {
  id: ID!
  filename: String!
  url: String!
}


  input LoginInput{
    email: String
    password: String!
  }

  input RegisterInput{
    fullname: String!
    nickname: String!
    email: String!
    password: String!
    confirm_password: String!
    choose_role: String
  }

  type Mutation {
    loginUser(about: LoginInput): AuthPayload
    registerUser(about: RegisterInput): AuthPayload
  }
`;


export default typeDefs