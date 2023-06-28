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
    twitter: SocialMediaOne
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
    postPrice: String
  }

  type PosterInfo {
    createdAt: String
    fullname: String
    confirmed: String
    selectedSocial: String
    selectedReview: String
  }

  type BusinessWholeInfo {
    createdAt: String
    brandname: String
    address: String
    brandCompletedPosts: [String]
    paidOut: String

    email: String
    phone: String
    postPrice: String
    websiteLink: String
    brandPendingPosts: [String]
  }

  type PosterWholeInfo {
    createdAt: String
    fullname: String
    phone: String
    balance: String
    paidOut: String

    email: String
    completedPosts: [String]
    pendingPosts: [String]
    socialMedia: SocialMedia
    reviewMedia: ReviewMedia
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
  

  getBusinessRegister(argument: String, page: String): [BusinessRegister]
  getBusinessRegisterwAddInfo(argument: String, page: String): [BusinessRegister]
  getBusinessRegisterNeedAddInfo(argument: String, page: String): [BusinessRegister]

  getPosterRegister(argument: String, page: String): [UserRegister]
  getPosterRegisterwSignup(argument: String, page: String): [UserRegister]
  getPosterRegisterwDetails(argument: String, page: String): [UserRegister]

  getBusinessInfoWPosts(argument: String, page: String): [BusinessInfo]
  getAcceptedBusinessInfoWPosts(argument: String, page: String): [BusinessInfo]
  getUnAcceptedBusinessInfoWPosts(argument: String, page: String): [BusinessInfo]

  getPosterInfoWPosts(argument: String, page: String): [PosterInfo]
  getAcceptedPosterInfoWPosts(argument: String, page: String): [PosterInfo]
  getUnAcceptedPosterInfoWPosts(argument: String, page: String): [PosterInfo]

  getBusinesswWholeInfo(argument: String, page: String): [BusinessWholeInfo]
  getPosterwWholeInfo(argument: String, page: String): [PosterWholeInfo]
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
  instagram: String
  facebook: String
  twitter: String

  
}

input ChangePosterInput{
  phone: String
  address: String 
}

input InfoStripeInput{
  userId: ID,
        bankAccountNumber: String,
        routingNumber: String,
        businessInformation: String,
        ssnLast4: String,
        industry: String,
        businessWebsite: String,
        ownerAddress: String,
        dateOfBirthday: String,
        dateOfBirthmonth: String,
        dateOfBirthyear: String,
        representativeName: String,
        representativePhoneNumber: String,
        termsOfServiceAcceptance: Boolean,
        ownerAddressline1: String,
        ownerAddresscity: String,
        ownerAddressstate: String,
        ownerAddresspostalCode: String,
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
    changePoster(about: ChangePosterInput, id: ID): String
    changeImage(image: [Upload], id: ID): String
    changeLogo(image: [Upload], id: ID): String

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
    addStripeAccountInfo(info: InfoStripeInput): String

    updatetoSchema(newfield: String, value: String): [User]
    banUser(email: String, text: String): String

    getBusiness(brandname: String): BusinessIdAndPrice
  }
`;


export default typeDefs