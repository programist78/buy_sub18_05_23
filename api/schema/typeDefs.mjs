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

  type SocialMediaOne {
    name: String
    followers: String
  }

  type SocialMedia {
    instagram: SocialMediaOne
    facebook: SocialMediaOne
    tiktok: SocialMediaOne
  }

  type ReviewMedia {
    google: String
    yelp: String
    tripadvisor: String
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
  getProfiles: [User]
  getUserbyToken(token: String): User

  getNewBrands: [User]
  getPopularBrands: [User]

  getBrandQuery(brandname: String!): User
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

  input BrandPostUpdateInput {
    title: String
    requirements: String
    id: ID
  }

  input ImageInput {
  image: Upload
  identifier: String
}

  type Mutation {
    loginUser(about: LoginInput): AuthPayload
    registerUser(about: RegisterInput, social: SocialMediaInput,review:ReviewMediaInput,   images: [ImageInput]): AuthPayload
    sendConfirmedEmail(email: String!): String
    changeStatus(id: ID, confirmationCode: String): String
    forgotPassword(email: String, confirmationCode: String, password: String): String
    forgotPasswordSend(email: String): String
    addAdmin(email: String): String

    addSocialMediaPoster(info: SocialMediaInput,  image: [Upload]!): User
    deleteSocialMediaPoster(email: String, id: String): User

    addSocialMediaBrand(info: SocialMediaInput): User
    deleteSocialMediaBrand(email: String, id: String): User

    addLocation(latitude: Float, longitude: Float, id: ID): User

    acceptPosterPost(posterPostId: ID): String
    declinePosterPost(posterPostId: ID): String

    createPosterPost(post: PosterPostInput!, image: [Upload]!): PosterPost

    topupBalance(email: String, money: String): User
    withdrawBalance(email: String, money: String): User

    updatetoSchema(newfield: String, value: String): [User]

    getBrand(brandname: String): String
  }
`;


export default typeDefs