import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { fileRenamer } from "../helpers/FileRenamer.js";
import {
  issueAuthToken,
  serializeUser,
  verifyAuthToken,
} from "../helpers/index.js";
import path from "path";
import fs from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { GraphQLError } from "graphql";
import { createUploadStream } from "../modules/streams.js";
import AWS from "aws-sdk";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import validatePassword from "../helpers/validatePassword.js";
// import BusinessPost from '../models/BusinessPost.js';
import PosterPost from "../models/PosterPost.js";
// const stripe = require('stripe')('sk_test_51NLjjVFZ6w63d2jlTnoBZbuFJWKEeRVFgc9cbXW0kOUMC6ILiHP11Z8kpJDhHT6Oau9MTgVgr2qnQtaRGpIp4UPa00N485uSnb');
import stripePackage from "stripe";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
const __dirname = path.resolve();
dotenv.config();
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY_SECRET,
});

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    //getProfile accepts the user’s email and returns user information with this email. If the user is not found, the "Invalid email given" error is thrown.
    getProfile: async (_parent, { email }, _context, _info) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid email given");
      }
      return user;
    },
    //getProfiles returns information about all users.
    getProfiles: async (_parent, args, _context, _info) => {
      const user = await User.find();
      return user;
    },
    //getUserbyToken accepts token and returns information about the user associated with this token. If the user is not found, the "User is undefined" error is discarded.
    getUserbyToken: async (_parent, { token }, _context, _info) => {
      let info = "";
      if (token) {
        info = await verifyAuthToken(token);
      }
      const email = info.id.email;
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("User is undefined");
      }
      return user;
    },
    //getAllPendingPosterPostsforBusiness adopts brand id and returns information about all unfinished posts for this brand. If the brand is not found, the "Invalid id given" error is discarded
    getAllPendingPosterPostsforBusiness: async (
      _parent,
      { id },
      _context,
      _info
    ) => {
      const brand = await User.findById(id);
      if (!brand) {
        throw new GraphQLError("Invalid id given");
      }
      const list = await Promise.all(
        brand.brandPendingPosts.map((post) => {
          // return BusinessPost.findById(post)
          return PosterPost.findById(post);
        })
      );
      return list;
    },
    //getAllCompletedPosterPostsforBusiness adopts brand id and returns information about all completed posts for this brand. If the brand is not found, the "Invalid id given" error is discarded.
    getAllCompletedPosterPostsforBusiness: async (
      _parent,
      { id },
      _context,
      _info
    ) => {
      const brand = await User.findById(id);
      if (!brand) {
        throw new GraphQLError("Invalid id given");
      }
      const list = await Promise.all(
        brand.brandCompletedPosts.map((post) => {
          // return BusinessPost.findById(post)
          return PosterPost.findById(post);
        })
      );
      return list;
    },
    //getAllPendingPosterPosts takes a user’s id and returns information about all pending posts for that user. If the user is not found, an “Invalid id given” error is thrown.
    getAllPendingPosterPosts: async (_parent, { id }, _context, _info) => {
      const user = await User.findById(id);
      if (!user) {
        throw new GraphQLError("Invalid id given");
      }
      const list = await Promise.all(
        user.pendingPosts.map((post) => {
          // return BusinessPost.findById(post)
          return PosterPost.findById(post);
        })
      );
      return list;
    },
    //getAllCompletedBusinessPosts takes a user’s id and returns information about all completed posts for that user. If the user is not found, an “Invalid id given” error is thrown.
    getAllCompletedBusinessPosts: async (_parent, { id }, _context, _info) => {
      const user = await User.findById(id);
      if (!user) {
        throw new GraphQLError("Invalid id given");
      }
      const list = await Promise.all(
        user.completedPosts.map((post) => {
          // return BusinessPost.findById(post)
          return PosterPost.findById(post);
        })
      );
      return list;
    },
    //getNewBusinesss returns information about all businesses that are not banned, sorted by their creation date in descending order.
    getNewBusinesss: async (_parent, args, _context, _info) => {
      const filter = {
        role: "BUSINESS",
        ban: false
      };
      const users = await User.find(filter).sort({ createdAt: -1 });
      return users;
    },
    //getPopularBusinesss returns information about all businesses, sorted by the number of their completed posts in descending order.
    getPopularBusinesss: async (_parent, args, _context, _info) => {
      const filter = {
        role: "BUSINESS",
      };
      const users = await User.find(filter).sort({ brandCompletedPosts: -1 });
      return users;
    },
    //getBusinessQuery takes a brandname and returns information about the business with that brand name. If the business is not found, a “A brand called [brandname] does not exist” error is thrown.
    getBusinessQuery: async (_parent, { brandname }, _context, _info) => {
      const user = await User.findOne({ brandname });
      if (!user) {
        throw new GraphQLError(`A brand called "${brandname}" does not exist`);
      }
      return user;
    },

    //getBusinessRegister takes a sorting argument argument and a page number page, and returns information about businesses on that page, sorted by the specified argument in descending order. The page size is 6.
    getBusinessRegister: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        role: "BUSINESS",
      };
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });
      return users;
    },
    //getBusinessRegisterwAddInfo takes a sorting argument argument and a page number page, and returns information about businesses on that page that have at least one letter in their brand description, sorted by the specified argument in descending order. The page size is 6.
    getBusinessRegisterwAddInfo: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        role: "BUSINESS",
        brandDescription: { $regex: /[a-zA-Z]/ }, // Проверка наличия хотя бы одной буквы
      };
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });
      return users;
    },
    //getBusinessRegisterNeedAddInfo takes a sorting argument argument and a page number page, and returns information about businesses on that page that do not have a brand description, sorted by the specified argument in descending order. The page size is 6.
    getBusinessRegisterNeedAddInfo: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        role: "BUSINESS",
        $or: [
          { brandDescription: null },
          { brandDescription: { $exists: false } },
        ],
      };
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });
      return users;
    },
    //getPosterRegister takes a sorting argument argument and a page number page, and returns information about posters on that page, sorted by the specified argument in descending order. The page size is 6.
    getPosterRegister: async (_parent, { argument, page }, _context, _info) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        role: "USER",
      };
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });
      return users;
    },
    //getPosterRegisterwSignup takes a sorting argument argument and a page number page, and returns information about posters on that page that do not have social media information, sorted by the specified argument in descending order. The page size is 6.
    getPosterRegisterwSignup: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        role: "USER",
        socialMedia: { $exists: false },
      };
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      return users;
    },
    //getPosterRegisterwDetails takes a sorting argument argument and a page number page, and returns information about posters on that page that have social media information, sorted by the specified argument in descending order. The page size is 6.
    getPosterRegisterwDetails: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        role: "USER",
        socialMedia: { $exists: true },
      };
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      return users;
    },
    //getBusinessInfoWPosts takes a sorting argument argument and a page number page, and returns information about posts on that page, along with details of the associated business, sorted by the specified argument in descending order. The page size is 6.
    getBusinessInfoWPosts: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const posts = await PosterPost.find()
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });
      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.brandId);
          return {
            ...post._doc,
            brandname: user.brandname,
            websiteLink: user.websiteLink,
            zipCode: user.zipCode,
            postPrice: user.postPrice,
          };
        })
      );

      return postsWithUserDetails;
    },
    // getAcceptedBusinessInfoWPosts takes a sorting argument argument and a page number page, and returns information about accepted posts on that page, along with details of the associated business, sorted by the specified argument in descending order. The page size is 6.
    getAcceptedBusinessInfoWPosts: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        confirmed: true,
      };
      const posts = await PosterPost.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.brandId);
          return {
            ...post._doc,
            brandname: user.brandname,
            websiteLink: user.websiteLink,
            zipCode: user.zipCode,
            postPrice: user.postPrice,
          };
        })
      );

      return postsWithUserDetails;
    },
    // getUnAcceptedBusinessInfoWPosts takes a sorting argument argument and a page number page, and returns information about unaccepted posts on that page, along with details of the associated business, sorted by the specified argument in descending order. The page size is 6
    getUnAcceptedBusinessInfoWPosts: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const filter = {
        confirmed: false,
      };
      const posts = await PosterPost.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.brandId);
          return {
            ...post._doc,
            brandname: user.brandname,
            websiteLink: user.websiteLink,
            zipCode: user.zipCode,
            postPrice: user.postPrice,
          };
        })
      );

      return postsWithUserDetails;
    },
    // getPosterInfoWPosts takes a sorting argument argument and a page number page, and returns information about posts on that page, along with details of the associated poster, sorted by the specified argument in descending order. The page size is 6.
    getPosterInfoWPosts: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const limit = 6;
      const skip = (page - 1) * limit;
      const posts = await PosterPost.find()
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.brandId);
          return {
            ...post._doc,
            fullname: user.fullname,
            email: user.email,
          };
        })
      );

      return postsWithUserDetails;
    },
    // getAcceptedPosterInfoWPosts takes a sorting argument argument and a page number page, and returns information about accepted posts on that page, along with details of the associated poster, sorted by the specified argument in descending order. The page size is 6.
    getAcceptedPosterInfoWPosts: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const filter = {
        confirmed: true,
      };
      const limit = 6;
      const skip = (page - 1) * limit;
      const posts = await PosterPost.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.brandId);
          return {
            ...post._doc,
            fullname: user.fullname,
            email: user.email,
          };
        })
      );

      return postsWithUserDetails;
    },
    // getUnAcceptedPosterInfoWPosts takes a sorting argument argument and a page number page, and returns information about unaccepted posts on that page, along with details of the associated poster, sorted by the specified argument in descending order. The page size is 6.
    getUnAcceptedPosterInfoWPosts: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const filter = {
        confirmed: false,
      };
      const limit = 6;
      const skip = (page - 1) * limit;
      const posts = await PosterPost.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      const postsWithUserDetails = await Promise.all(
        posts.map(async (post) => {
          const user = await User.findById(post.brandId);
          return {
            ...post._doc,
            fullname: user.fullname,
            email: user.email,

            instagramNick: user.socialMedia.instagram.name,
            facebookNick: user.socialMedia.facebook.name,
            tiktokNick: user.socialMedia.tiktok.name,
            instagramFollowers: user.socialMedia.instagram.followers,
            facebookFollowers: user.socialMedia.facebook.followers,
            tiktokFollowers: user.socialMedia.tiktok.followers,
            
            
            googleNick: user.reviewMedia.google,
            yelpNick: user.reviewMedia.yelp,
            tripadvisorNick: user.reviewMedia.tripadvisor,
          };
        })
      );
      return postsWithUserDetails;
    },
    //getBusinesswWholeInfo takes a sorting argument argument and a page number page, and returns information about businesses on that page, sorted by the specified argument in descending order. The page size is 6.
    getBusinesswWholeInfo: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const filter = {
        role: "BUSINESS",
      };
      const limit = 6;
      const skip = (page - 1) * limit;
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      return users;
    },
        //getBusinesswWholeInfo takes a sorting argument argument and a page number page, and returns information about poster on that page, sorted by the specified argument in descending order. The page size is 6.
    getPosterwWholeInfo: async (
      _parent,
      { argument, page },
      _context,
      _info
    ) => {
      const filter = {
        role: "USER",
      };
      const limit = 6;
      const skip = (page - 1) * limit;
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ [argument]: -1 });

      return users;
    },
  },
  Mutation: {
    //authorisation
    //registration for posters and businesses
    registerUser: async (parent, args, social, context, _info) => {
      const {
        fullname,
        websiteLink,
        address,
        brandname,
        email,
        password,
        confirm_password,
        phone,
        brandDirection,
        latitude,
        longitude,
      } = args.about;

      let postPrice = 500;
      const already_exsist = await User.findOne({ email });
      if (already_exsist) {
        throw new GraphQLError("Email already exists");
      }

      if (password !== confirm_password) {
        throw new GraphQLError(
          "Password and password confirmation must be the same"
        );
      }

      if (password.length < 8) {
        throw new GraphQLError(
          "Weak password, the password should consist of 8 characters and have at least one number"
        );
      }

      const avatarUrl = `${process.env.HOST}/defaultperson.svg`;

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      let math = Math.random() * 43564389374833;
      let confirmationCode = Math.round(math);

      let user;

      if (brandname) {
        const brand_exist = await User.findOne({ email });
        const brandname_exist = await User.findOne({ brandname });
        if (brand_exist) {
          throw new GraphQLError("Email already exists");
        }
        if (brandname_exist) {
          throw new GraphQLError("Business name already exists");
        }
        user = new User({
          fullname,
          email,
          passwordHash,
          address,
          role: "BUSINESS",
          websiteLink,
          confirmedEmail: false,
          confirmationCode,
          avatarUrl,
          balance: 0,
          brandname,
          physicalLocation: { latitude, longitude },
          brandDirection,
          phone,
          postPrice,
          paidOut: 0,
          brandDescription: "",
          ban: false,
          socialMedia: { instagram: "", facebook: "", twitter: "" },
        });
      } else {
        // const account = await stripe.accounts.create({
        //     type: 'custom',
        //     country: 'US',
        //     email: email,
        //     capabilities: {
        //       card_payments: {requested: true},
        //       transfers: {requested: true},
        //     },
        //   });
        //   if (!account) {
        //     throw new GraphQLError("Problem with Stripe Account")
        //   }
        user = new User({
          fullname,
          email,
          passwordHash,
          role: "USER",
          confirmedEmail: false,
          confirmationCode,
          avatarUrl,
          balance: 0,
          phone,
          reviewMedia: {},
          socialMedia: {},
          stripeAccountId: "",
          address: "",
          ban: false,
          brandname: ""
        });
      }

      let result = await user.save();
      result = await serializeUser(result);

      const token = await issueAuthToken({ email, role: user.role });
      return { token, user };
    },
    //changing information for businesses
    changeUser: async (parent, { about, id }, social, context, _info) => {
      const userFind = await User.findById(id);
      if (!userFind) {
        throw new GraphQLError("Business is undefined");
      }

      const user = await User.findByIdAndUpdate(
        id,
        {
          phone: about?.phone,
          postPrice: about?.postPrice,
          address: about?.address,
          websiteLink: about?.websiteLink,
          brandDescription: about?.brandDescription,
          socialMedia: {
            instagram: { name: about.instagram },
            facebook: { name: about.facebook },
            twitter: { name: about.twitter },
          },
        },
        { new: true }
      );
      if (!user) {
        throw new GraphQLError("Something went wrong");
      }
      return "Done!";
    },
    //changing image for business
    changeImage: async (parent, { image, id }, social, context, _info) => {
      const userFind = await User.findById(id);
      if (!userFind) {
        throw new GraphQLError("Business is undefined");
      }
      let images = [];

      // for (let i = 0; i < image.length; i++) {
      //   const { createReadStream, filename, mimetype } = await image[i];
      //   const stream = createReadStream();
      //   const assetUniqName = fileRenamer(filename);
      //   let extension = mimetype.split("/")[1];
      //   const pathName = path.join(
      //     __dirname,
      //     `./uploads/${assetUniqName}.${extension}`
      //   );
      //   await stream.pipe(fs.createWriteStream(pathName));
      //   const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
      //   images.push(urlForArray);
      // }
      for (let i = 0; i < image.length; i++) {
        const { createReadStream, filename, mimetype, encoding } = await image[i];
        // const parts = filename.split('.');
        // const extension = parts[parts.length - 1];
        // const stream = createReadStream();
        const assetUniqName = fileRenamer(filename);
        const bucketName = process.env.BUCKET_NAME;
        const params = {
            Bucket: bucketName,
            Key: assetUniqName,
            Body: createReadStream(),
            // ACL: 'public-read',
            ContentType: mimetype,
          };
          
          const uploadResult = await s3.upload(params).promise();
        // const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
        // await stream.pipe(fs.createWriteStream(pathName));
        // const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
        images.push(uploadResult.Location);
        }
      const user = await User.findByIdAndUpdate(
        id,
        {
          image: images[0],
        },
        { new: true }
      );
      if (!user) {
        throw new GraphQLError("Something went wrong");
      }
      return "Done!";
    },
    //changing logo for businesses
    changeLogo: async (parent, { image, id }, social, context, _info) => {
      const userFind = await User.findById(id);
      if (!userFind) {
        throw new GraphQLError("Business is undefined");
      }
      let images = [];

      // for (let i = 0; i < image.length; i++) {
      //   const { createReadStream, filename, mimetype } = await image[i];
      //   const stream = createReadStream();
      //   const assetUniqName = fileRenamer(filename);
      //   let extension = mimetype.split("/")[1];
      //   const pathName = path.join(
      //     __dirname,
      //     `./uploads/${assetUniqName}.${extension}`
      //   );
      //   await stream.pipe(fs.createWriteStream(pathName));
      //   const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
      //   images.push(urlForArray);
      // }
      for (let i = 0; i < image.length; i++) {
        const { createReadStream, filename, mimetype, encoding } = await image[i];
        // const parts = filename.split('.');
        // const extension = parts[parts.length - 1];
        // const stream = createReadStream();
        const assetUniqName = fileRenamer(filename);
        const bucketName = process.env.BUCKET_NAME;
        const params = {
            Bucket: bucketName,
            Key: assetUniqName,
            Body: createReadStream(),
            // ACL: 'public-read',
            ContentType: mimetype,
          };
          
          const uploadResult = await s3.upload(params).promise();
        // const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
        // await stream.pipe(fs.createWriteStream(pathName));
        // const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
        images.push(uploadResult.Location);
        }
      const user = await User.findByIdAndUpdate(
        id,
        {
          avatarUrl: images[0],
        },
        { new: true }
      );
      if (!user) {
        throw new GraphQLError("Something went wrong");
      }
      return "Done!";
    },
    //finish register for posters
    registerUserComplete: async (_, args, context, info) => {
      const {
        instagramUserName,
        instagramFollowers,
        facebookUserName,
        facebookFollowers,
        tiktokUserName,
        tiktokFollowers,
      } = args.social;
      const { googleReview, yelpReview, tripadvisorReview } = args.review;
      if (!instagramUserName && !facebookUserName && !tiktokUserName) {
        throw new GraphQLError("Please fill at least one social media");
      }
      if (!googleReview && !yelpReview && !tripadvisorReview) {
        throw new GraphQLError("Please select review service");
      }
      if (!args.images || args.images.length === 0) {
        throw new GraphQLError(
          "Please add images that confirm your account ownership"
        );
      }
      const user = await User.findById(args.id);
      if (!user) {
        throw new GraphQLError("Invalid email given- changestatus");
      }
      let images = [];
      const { number, link, email } = info;
      // for (let i = 0; i < args.images.length; i++) {
      //   const { createReadStream, filename, mimetype } = await args.images[i];
      //   const stream = createReadStream();
      //   const assetUniqName = fileRenamer(filename);
      //   let extension = mimetype.split("/")[1];
      //   const pathName = path.join(
      //     __dirname,
      //     `./uploads/${assetUniqName}.${extension}`
      //   );
      //   await stream.pipe(fs.createWriteStream(pathName));
      //   const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
      //   images.push(urlForArray);
      // }
      for (let i = 0; i < args.images.length; i++) {
        const { createReadStream, filename, mimetype, encoding } = await args.images[i];
        // const parts = filename.split('.');
        // const extension = parts[parts.length - 1];
        // const stream = createReadStream();
        const assetUniqName = fileRenamer(filename);
        const bucketName = process.env.BUCKET_NAME;
        const params = {
            Bucket: bucketName,
            Key: assetUniqName,
            Body: createReadStream(),
            // ACL: 'public-read',
            ContentType: mimetype,
          };
          
          const uploadResult = await s3.upload(params).promise();
        // const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
        // await stream.pipe(fs.createWriteStream(pathName));
        // const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
        images.push(uploadResult.Location);
        }
      const newuser = await User.findByIdAndUpdate(
        args.id,
        {
          reviewMedia: {
            google: googleReview,
            yelp: yelpReview,
            tripadvisor: tripadvisorReview,
          },
          socialMedia: {
            instagram: {
              name: instagramUserName,
              followers: instagramFollowers,
            },
            facebook: { name: facebookUserName, followers: facebookFollowers },
            tiktok: { name: tiktokUserName, followers: tiktokFollowers },
            aproveScreenshots: images,
          },
        },
        { new: true }
      );
      if (!newuser) {
        throw new GraphQLError("Something went wrong!");
      }
      const token = await issueAuthToken({ email, role: user.role });
      return { token, user: newuser };
    },
    //login User(for posters, businesses, admins)
    loginUser: async (_, args, context, info) => {
      const { password, email } = args.about;
      let user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid email  given");
      }

      const isValidPass = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPass) {
        throw new GraphQLError("Invalid password given!");
      }
      let result = await user.save();
      result = await serializeUser(result);
      const token = await issueAuthToken({
        email: user.email,
        role: user.role,
      });
      return { user, token };
    },
    //forgot password for all users
    forgotPassword: async (
      parent,
      { email, confirmationCode, password },
      args
    ) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid email given- changestatus");
      }
      const isValidPass = confirmationCode == user.confirmationCode;
      if (!isValidPass) {
        throw new GraphQLError("Invalid confirmationCode given!");
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const newuser = await User.findByIdAndUpdate(
        user.id,
        { passwordHash },
        { new: true }
      );
      if (!newuser) {
        throw new GraphQLError("Something went wrong!");
      }
      return "Done";
    },
    // forgot password but in email
    forgotPasswordSend: async (parent, { email }, args) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid email given- forgot password");
      }
      let math = Math.random() * 43564389374833;
      let newconfirmationCode = Math.round(math);
      const newuser = await User.findByIdAndUpdate(
        user.id,
        { confirmationCode: newconfirmationCode },
        { new: true }
      );
      if (!newuser) {
        throw new GraphQLError("Something went wrong");
      }
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.SENDGRID_APIKEY,
          },
        })
      );
      let mailOptions = {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "password recovery",
        text:
          "Hello " +
          user.fullname +
          ",\n\n" +
          "Type this code on website:" +
          newuser.confirmationCode,
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return console.log(err);
        }
      });
      return "Send!";
    },
    //accept poster post by business
    acceptPosterPost: async (parent, { posterPostId }, context, info) => {
      const posterpost = await PosterPost.findOne({ _id: posterPostId });
      if (!posterpost) {
        throw new GraphQLError("Post from poster is undefined");
      }
      if (posterpost.brandPendingPosts == true) {
        throw new GraphQLError("This post already accepted");
      }
      const brand = await User.findOne({ _id: posterpost.brandId });
      if (!brand) {
        throw new GraphQLError("Such brand is undefined");
      }
      if (!brand.brandPendingPosts.includes(posterPostId)) {
        throw new GraphQLError("Requested post not found");
      }
      const newbrand = await User.findByIdAndUpdate(
        posterpost.brandId,
        {
          $pull: { brandPendingPosts: posterPostId },
          $push: { brandCompletedPosts: posterPostId },
          $inc: { paidOut: brand.postPrice },
        },
        { new: true }
      );
      if (!newbrand) {
        throw new GraphQLError("Some problems with this business");
      }
      const newposterpost = await PosterPost.findByIdAndUpdate(
        posterPostId,
        { confirmed: true },
        { new: true }
      );
      if (!newposterpost) {
        throw new GraphQLError("Some problems with poster posts");
      }
      const newposter = await User.findByIdAndUpdate(
        posterpost.authorId,
        {
          $pull: { pendingPosts: posterPostId },
          $push: { completedPosts: posterPostId },
          $inc: { balance: brand.postPrice },
        },
        { new: true }
      );
      if (!newposter) {
        throw new GraphQLError("Some problems with this poster");
      }
      return "Accept";
    },
    //decline poster post by business
    declinePosterPost: async (parent, { posterPostId }, context, info) => {
      const posterpost = await PosterPost.findOne({ _id: posterPostId });
      if (!posterpost) {
        throw new GraphQLError("Post from poster is undefined");
      }
      const brand = await User.findOne({ _id: posterpost.brandId });
      if (!brand) {
        throw new GraphQLError("Business is undefined");
      }
      if (!brand.brandPendingPosts.includes(posterPostId)) {
        throw new GraphQLError("Requested post not found");
      }
      const newbrandpost = await User.findByIdAndUpdate(
        posterpost.brandId,
        { $pull: { brandPendingPosts: posterPostId } },
        { new: true }
      );
      const newposter = await User.findByIdAndUpdate(
        posterpost.authorId,
        { $pull: { pendingPosts: posterPostId } },
        { new: true }
      );

      return "Decline";
    },
    // addLocation: async (parent, {latitude, longitude, id}, context, info) => {
    //     const user = await User.findById(id)
    //     if (!user) {
    //         throw new GraphQLError("User is undefined")
    //     }

    //     user.physicalLocation = {
    //         latitude: latitude,
    //         longitude: longitude,
    //       };

    //       // Сохранение обновленного пользователя
    //       await user.save();
    //       return "Done!"
    // },
    //poster
    //create post for poster
    createPosterPost: async (parent, { image, post }) => {
      let images = [];

      // for (let i = 0; i < image.length; i++) {
      //   const { createReadStream, filename, mimetype } = await image[i];
      //   const stream = createReadStream();
      //   const assetUniqName = fileRenamer(filename);
      //   let extension = mimetype.split("/")[1];
      //   const pathName = path.join(
      //     __dirname,
      //     `./uploads/${assetUniqName}.${extension}`
      //   );
      //   await stream.pipe(fs.createWriteStream(pathName));
      //   const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
      //   images.push(urlForArray);
      // }
      for (let i = 0; i < image.length; i++) {
        const { createReadStream, filename, mimetype, encoding } = await image[i];
        // const parts = filename.split('.');
        // const extension = parts[parts.length - 1];
        // const stream = createReadStream();
        const assetUniqName = fileRenamer(filename);
        const bucketName = process.env.BUCKET_NAME;
        const params = {
            Bucket: bucketName,
            Key: assetUniqName,
            Body: createReadStream(),
            // ACL: 'public-read',
            ContentType: mimetype,
          };
          
          const uploadResult = await s3.upload(params).promise();
        // const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
        // await stream.pipe(fs.createWriteStream(pathName));
        // const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
        images.push(uploadResult.Location);
        }
      const { text, authorId, brandId, selectedReview, selectedSocial } = post;
      const brand = await User.findById(brandId);
      const author = await User.findById(authorId);
      if (!brand) {
        throw new GraphQLError("There is no such brand");
      }
      if (selectedSocial == "instagram") {
        if (!author.socialMedia.instagram.name) {
          throw new GraphQLError("You have no confirmed instagram");
        }
      }
      if (selectedSocial == "facebook") {
        if (!author.socialMedia.facebook.name) {
          throw new GraphQLError("You have no confirmed facebook");
        }
      }
      if (selectedSocial == "tiktok") {
        if (!author.socialMedia.tiktok.name) {
          throw new GraphQLError("You have no confirmed tiktok");
        }
      }
      if (selectedReview == "google") {
        if (!author.reviewMedia.google) {
          throw new GraphQLError("You have no confirmed google");
        }
      }
      if (selectedReview == "yelp") {
        if (!author.reviewMedia.yelp) {
          throw new GraphQLError("You have no confirmed yelp");
        }
      }
      if (selectedReview == "tripadvisor") {
        if (!author.reviewMedia.tripadvisor) {
          throw new GraphQLError("You have no confirmed tripadvisor");
        }
      }
      const postcreate = new PosterPost({
        selectedReview,
        selectedSocial,
        text,
        authorId,
        brandId,
        images,
        confirmed: false,
      });
      await postcreate.save();
      const newuser = await User.findByIdAndUpdate(
        authorId,
        { $push: { pendingPosts: postcreate.id } },
        { new: true }
      );
      const newrequest = await User.findByIdAndUpdate(
        brandId,
        { $push: { brandPendingPosts: postcreate.id } },
        { new: true }
      );
      return postcreate;
    },
    //get business but in Mutaion format
    getBusiness: async (_parent, { brandname }, _context, _info) => {
      const user = await User.findOne({ brandname });
      if (!user) {
        throw new GraphQLError(`A brand called "${brandname}" does not exist`);
      }
      return { id: user.id, postPrice: user.postPrice };
    },
    //admin
    //update all users in schema
    updatetoSchema: async (_, args, context, info) => {
      const { newfield, value } = args;
      const user = await User.updateMany({}, { $set: { [newfield]: value } });
      return user;
    },
    //ban user by admin
    banUser: async (parent, { email, text }, args) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid email given- changestatus");
      }
      const newuser = await User.findByIdAndUpdate(
        user.id,
        { ban: true },
        { new: true }
      );
      if (!newuser) {
        throw new GraphQLError("Something went wrong!");
      }
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.SENDGRID_APIKEY,
          },
        })
      );
      let mailOptions = {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "ban",
        text: "Hello " + user.fullname + ",\n\n" + "Ban" + text,
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          throw new GraphQLError("Seomething went wrong with nodemailer");
        }
      });
      return "Send!";
    },
    //unban user by admin
    unBanUser: async (parent, { email, text }, args) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid email given");
      }
      const newuser = await User.findByIdAndUpdate(
        user.id,
        { ban: false },
        { new: true }
      );
      if (!newuser) {
        throw new GraphQLError("Something went wrong!");
      }
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.SENDGRID_APIKEY,
          },
        })
      );
      let mailOptions = {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "ban",
        text: "Hello " + user.fullname + ",\n\n" + "Ban" + text,
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          throw new GraphQLError("Seomething went wrong with nodemailer");
        }
      });
      return "Send!";
    },
  },
};

export default resolvers;
