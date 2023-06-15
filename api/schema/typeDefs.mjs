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

  type SocialMediaOne {
    name: String
    followers: String
  }

  type SocialMedia {
    instagram: SocialMediaOne
    facebook: SocialMediaOne
    tiktok: SocialMediaOne
    aproveScreenshots: [String]
  }

  type ReviewMedia {
    google: String
    yelp: String
    tripadvisor: String
  }


  type BusinessPost {
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
    id: ID
    title: String
    text: String
    authorId: String
    postId: String
    images: [String]
    confirmed: Boolean
    selectedReview: String
    selectedSocial: String
  } 

  type Coordinates {
    latitude: String
    longitude: String
  }



  type User{
    id: ID
    fullname: String
    email: String
    role: String
    socialMedia: SocialMedia
    reviewMedia: ReviewMedia
    confirmedEmail: Boolean
    avatarUrl: String
    phone: String
    pendingPosts: [String]
    completedPosts: [String]
    balance: Int
    brandPendingPosts: [String]
    brandCompletedPosts: [String]
    postPrice: Int
    brandname: String
    physicalLocation: Coordinates
    brandDirection: String
    plan: String
    hasTrial: Boolean
    endDate: String
    websiteLink: String
    address: String
    brandDescription: String
    image: String
    zipCode: String
  }

  type AuthPayload {
    user: User
    token: String
  }

  type BusinessRegister {
    createdAt: String
    brandname: String
    address: String
    email: String
    brandDescription: String
  }

  type UserRegister {
    createdAt: String
    fullname: String
    reviewMedia: ReviewMedia
    email: String
  }

  type BusinessInfo {
    createdAt: String
    zipCode: String
    brandname: String
    websiteLink: String
    confirmed: String
  }

  type BusinessIdAndPrice {
    postPrice: String
    id: ID
  }



  type Query {
  getAllBusinessPosts(id: ID): [BusinessPost]
  getAllCompletedBusinessPosts(id: ID): [BusinessPost]
  getAllPendingPosterPostsforBusiness(id: ID): [PosterPost]
  getAllCompletedPosterPostsforBusiness(id: ID): [PosterPost]

  getAllPendingPosterPosts(id: ID): [PosterPost]
  getAllCompletedPosterPosts(id: ID): [PosterPost]

  getProfile: User
  getProfiles: [User]
  getUserbyToken(token: String): User

  getNewBusinesss: [User]
  getPopularBusinesss: [User]

  getBusinessQuery(brandname: String!): User
  

  getBusinessRegister(argument: String): [BusinessRegister]
  getBusinessRegisterwAddInfo(argument: String): [BusinessRegister]

  getPosterRegister(argument: String): [UserRegister]
  getPosterRegisterwAddInfo(argument: String): [UserRegister]

  getBusinessInfowPosts(argument: String): [BusinessInfo]
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
    email: String!
    password: String!
    confirm_password: String!
    brandname: String
    phone: String
    brandDirection: String
    postPrice: String
    latitude: Float
    longitude: Float
    websiteLink: String
    address: String

    
  }

  input SocialMediaInput{
    instagramUserName: String!
    instagramFollowers: String!
    

    facebookUserName: String!
    facebookFollowers: String!


    tiktokUserName: String!
    tiktokFollowers: String!
 
  }

  input ReviewMediaInput{
    googleReview: String
    yelpReview: String
    tripadvisorReview: String
  }


  input PosterPostInput {
    text: String
    authorId: String
    brandId: String
    selectedSocial: String
    selectedReview: String
    }

  input BusinessPostUpdateInput {
    title: String
    requirements: String
    id: ID
  }

  input ImageInput {
  image: Upload
  identifier: String
}

input ChangeUserInput{
  phone: String
  postPrice: String
  address: String
  websiteLink: String
  brandDescription: String
}

  type Mutation {
    loginUser(about: LoginInput): AuthPayload
    registerUser(about: RegisterInput): AuthPayload
    registerUserComplete(id: ID,social: SocialMediaInput,review:ReviewMediaInput,   images: [Upload]): AuthPayload
    sendConfirmedEmail(email: String!): String
    changeStatus(id: ID, confirmationCode: String): String
    forgotPassword(email: String, confirmationCode: String, password: String): String
    forgotPasswordSend(email: String): String
    addAdmin(email: String): String
    changeUser(about: ChangeUserInput, id: ID): String

    addSocialMediaPoster(info: SocialMediaInput,  image: [Upload]!): User
    deleteSocialMediaPoster(email: String, id: String): User

    addSocialMediaBusiness(info: SocialMediaInput): User
    deleteSocialMediaBusiness(email: String, id: String): User

    addLocation(latitude: Float, longitude: Float, id: ID): User

    acceptPosterPost(posterPostId: ID): String
    declinePosterPost(posterPostId: ID): String

    createPosterPost(post: PosterPostInput!, image: [Upload]!): PosterPost

    topupBalance(email: String, money: String): User
    withdrawBalance(email: String, money: String): User

    updatetoSchema(newfield: String, value: String): [User]

    getBusiness(brandname: String): BusinessIdAndPrice
  }
`;


export default typeDefs