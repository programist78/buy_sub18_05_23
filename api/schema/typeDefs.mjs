// import singleTypeDefs from ''

const typeDefs = `#graphql
  scalar Upload
  type File {
    url: [String]
  }
  enum Role {
  USER
  BRAND
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
    images: [String]
    number: String
    nick: String
    id: String
  }

  type PosterPost {
    title: String
  }

  type BrandPost {
    title: String
    requirements: String
    authorId: String
    requestsId: [String]
    acceptedId: [String]
    images: [String]
    payment: String
    quantity: String
  } 

  type PosterPost {
    title: String
    text: String
    authorId: String
    postId: String
    images: [String]
    confirmed: Boolean
  } 

  type Coordinates {
    latitude: Float
    longitude: Float
  }



  type User{
    id: ID
    fullname: String
    email: String
    role: String
    socialMedia: [SocialMedia]
    confirmedEmail: Boolean
    avatarUrl: String
    pendingPosts: [String]
    completedPosts: [String]
    balance: Int
    BrandPosts: [String]
    completedBrandPosts: [String]
    brandname: String
    physicalLocation: [Coordinates]
  }

  type AuthPayload {
    user: User
    token: String
  }



  type Query {
  getAllBrandPosts(id: ID): [BrandPost]
  getAllCompletedBrandPosts(id: ID): [BrandPost]
  getAllPendingPosterPostsforBrand(id: ID): [PosterPost]
  getAllCompletedPosterPostsforBrand(id: ID): [PosterPost]

  getAllPendingPosterPosts(id: ID): [PosterPost]
  getAllCompletedPosterPosts(id: ID): [PosterPost]

  getProfile: User
  }

  type Image {
  id: ID!
  filename: String!
  url: String!
}


  input LoginInput{
    input: String
    password: String!
  }

  input RegisterInput{
    fullname: String!
    email: String!
    password: String!
    confirm_password: String!
    brandname: String
  }

  input SocialMediaInput{
    number: String!
    nick: String!
    email: String
  }

  input BrandPostInput {
    title: String
    requirements: String
    authorId: String
    payment: String
    quantity: String
  }

  input PosterPostInput {
    title: String
    text: String
    authorId: String
    postId: String
    }

  input BrandPostUpdateInput {
    title: String
    requirements: String
    id: ID
  }

  type Mutation {
    loginUser(about: LoginInput): AuthPayload
    registerUser(about: RegisterInput): AuthPayload
    sendConfirmedEmail(email: String!): AuthPayload
    changeStatus(id: ID, confirmationCode: String): User
    forgotPassword(id: ID, confirmationCode: String, password: String): User
    forgotPasswordSend(email: String): String
    addAdmin(email: String): User

    addSocialMedia(info: SocialMediaInput,  image: [Upload]!): User
    deleteSocialMedia(email: String, id: String): User

    createBrandPost(post: BrandPostInput!, image: [Upload]!): BrandPost
    updateBrandPost(post: BrandPostUpdateInput, image: [Upload]): BrandPost
    deleteBrandPost(id: ID): String
    addLocation(latitude: Float, longitude: Float, id: ID): User

    acceptPosterPost(brandPostId: ID, posterPostId: ID): String
    declinePosterPost(brandPostId: ID, posterPostId: ID): String

    createPosterPost(post: PosterPostInput!, image: [Upload]!): PosterPost

    topupBalance(email: String, money: String): User
    withdrawBalance(email: String, money: String): User

    updatetoSchema(newfield: String, value: String): [User]
  }
`;


export default typeDefs