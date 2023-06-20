import User from '../models/User.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileRenamer } from "../helpers/FileRenamer.js";
import { issueAuthToken, serializeUser, verifyAuthToken } from "../helpers/index.js";
import path from "path";
import fs from  'fs'
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { GraphQLError } from 'graphql';
import { createUploadStream } from '../modules/streams.js';
import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport';
import validatePassword from '../helpers/validatePassword.js';
// import BusinessPost from '../models/BusinessPost.js';
import PosterPost from '../models/PosterPost.js';
const __dirname = path.resolve();
dotenv.config()
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  });

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        //all
        getProfile: async(_parent, {email}, _context, _info) => {
            const user = await User.findOne(
                {email}
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given");
                }
                return user
        },
        getProfiles: async(_parent, args, _context, _info) => {
            const user = await User.find();
                return user
        },
        getUserbyToken: async (_parent, {token}, _context, _info) => {
            let info = ""
            if (token) {
                info = await verifyAuthToken(token)
            }
            const email = info.id.email
            const user = await User.findOne({ email });
            if (!user) {
                throw new GraphQLError("User is undefined")
            }
            return user
        },
        //brand
        getAllPendingPosterPostsforBusiness:async(_parent, {id}, _context, _info) => {
            const brand = await User.findById(id)
            if (!brand) {
                throw new GraphQLError("Invalid id given");
            }
            const list = await Promise.all(
                brand.brandPendingPosts.map((post) => {
                    // return BusinessPost.findById(post)
                    return PosterPost.findById(post)
                }),
                )
            return list
        }, 
        getAllCompletedPosterPostsforBusiness:async(_parent, {id}, _context, _info) => {
            const brand = await User.findById(id)
            if (!brand) {
                throw new GraphQLError("Invalid id given");
            }
            const list = await Promise.all(
                brand.brandCompletedPosts.map((post) => {
                    // return BusinessPost.findById(post)
                    return PosterPost.findById(post)
                }),
                )
            return list
        }, 
        //poster
        getAllPendingPosterPosts: async(_parent, {id}, _context, _info) => {
            const user = await User.findById(id)
            if (!user) {
                throw new GraphQLError("Invalid id given");
            }
            const list = await Promise.all(
                user.pendingPosts.map((post) => {
                    // return BusinessPost.findById(post)
                    return PosterPost.findById(post)
                }),
                )
            return list
        },
        getAllCompletedBusinessPosts: async(_parent, {id}, _context, _info) => {
            const user = await User.findById(id)
            if (!user) {
                throw new GraphQLError("Invalid id given");
            }
            const list = await Promise.all(
                user.completedPosts.map((post) => {
                    // return BusinessPost.findById(post)
                    return PosterPost.findById(post)
                }),
                )
            return list
        },
        //brand
        getNewBusinesss: async(_parent, args, _context, _info) => {

            const filter = {
                role: "BUSINESS",
              };
              const users = await User.find(filter).sort({ createdAt: -1 });;
              return users
        },
        getPopularBusinesss: async(_parent, args, _context, _info) => {
            const filter = {
                role: "BUSINESS",
              };
              const users = await User.find(filter).sort({ brandCompletedPosts: -1 });;
              return users
        },
        getBusinessQuery: async(_parent, {brandname}, _context, _info) => {
            const user = await User.findOne(
                {brandname}
                );
                if (!user) {
                    throw new GraphQLError(`A brand called "${brandname}" does not exist`);
                }
                return user
        },
        getBusinessRegister: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                role: "BUSINESS",
              };
              const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              return users
        },
        getBusinessRegisterwAddInfo: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                role: "BUSINESS",
                brandDescription: { $regex: /[a-zA-Z]/ } // Проверка наличия хотя бы одной буквы
            };
            const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              return users
        },
        getBusinessRegisterNeedAddInfo: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                role: "BUSINESS",
                $or: [{ brandDescription: null }, { brandDescription: { $exists: false } }]            };
            const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              return users
        },
        getPosterRegister: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                role: "USER"
              };
              const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              return users
        },
        getPosterRegisterwSignup: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                role: "USER",
                socialMedia: { $exists: false },
              };
              const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              
              return users
        },
        getPosterRegisterwDetails: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                role: "USER",
                socialMedia: { $exists: true },
              };
              const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              
              return users
        },
        getBusinessInfoWPosts: async (_parent, {argument, page }, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const posts = await PosterPost.find().skip(skip).limit(limit).sort({ [argument]: -1 });
            const postsWithUserDetails = await Promise.all(
              posts.map(async (post) => {
                const user = await User.findById(post.brandId);
                return {
                  ...post._doc,
                  brandname: user.brandname,
                  websiteLink: user.websiteLink,
                  zipCode: user.zipCode,
                  postPrice: user.postPrice
                };
              })
            );
          
            return postsWithUserDetails;
          },
          getAcceptedBusinessInfoWPosts: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                confirmed: true,
            };
            const posts = await PosterPost.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });
          
            const postsWithUserDetails = await Promise.all(
              posts.map(async (post) => {
                const user = await User.findById(post.brandId);
                return {
                  ...post._doc,
                  brandname: user.brandname,
                  websiteLink: user.websiteLink,
                  zipCode: user.zipCode,
                  postPrice: user.postPrice
                };
              })
            );
          
            return postsWithUserDetails;
        },
        getUnAcceptedBusinessInfoWPosts: async(_parent, {argument, page}, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const filter = {
                confirmed: false,
            };
            const posts = await PosterPost.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });
          
            const postsWithUserDetails = await Promise.all(
              posts.map(async (post) => {
                const user = await User.findById(post.brandId);
                return {
                  ...post._doc,
                  brandname: user.brandname,
                  websiteLink: user.websiteLink,
                  zipCode: user.zipCode,
                  postPrice: user.postPrice
                };
              })
            );
          
            return postsWithUserDetails;
        },
        getPosterInfoWPosts: async (_parent, { argument, page }, _context, _info) => {
            const limit = 6;
            const skip = (page - 1) * limit;
            const posts = await PosterPost.find().skip(skip).limit(limit).sort({ [argument]: -1 });
          
            const postsWithUserDetails = await Promise.all(
              posts.map(async (post) => {
                const user = await User.findById(post.brandId);
                return {
                  ...post._doc,
                  fullname: user.fullname,
                  email: user.email
                };
              })
            );
          
            return postsWithUserDetails;
          },
          getAcceptedPosterInfoWPosts: async(_parent, {argument, page}, _context, _info) => {
            const filter = {
                confirmed: true,
            };
            const limit = 6;
            const skip = (page - 1) * limit;
            const posts = await PosterPost.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });
          
            const postsWithUserDetails = await Promise.all(
              posts.map(async (post) => {
                const user = await User.findById(post.brandId);
                return {
                  ...post._doc,
                  fullname: user.fullname,
                  email: user.email
                };
              })
            );
          
            return postsWithUserDetails;
        },
        getUnAcceptedPosterInfoWPosts: async(_parent, {argument, page}, _context, _info) => {
            const filter = {
                confirmed: false,
            };
            const limit = 6;
            const skip = (page - 1) * limit;
            const posts = await PosterPost.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });
          
            const postsWithUserDetails = await Promise.all(
              posts.map(async (post) => {
                const user = await User.findById(post.brandId);
                return {
                  ...post._doc,
                  fullname: user.fullname,
                  email: user.email
                };
              })
            );
          
            return postsWithUserDetails;
        },
        getBusinesswWholeInfo: async(_parent, {argument, page}, _context, _info) => {
            const filter = {
                role: "BUSINESS",
              };
              const limit = 6;
              const skip = (page - 1) * limit;
              const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              
              return users
        },
        getPosterwWholeInfo: async(_parent, {argument, page}, _context, _info) => {
            const filter = {
                role: "USER",
              };
              const limit = 6;
              const skip = (page - 1) * limit;
              const users = await User.find(filter).skip(skip).limit(limit).sort({ [argument]: -1 });;
              
              return users
        },
    },
    Mutation: {
        //authorisation
        registerUser: async(parent, args,social, context, _info) => {
            
                const { fullname,websiteLink,address, brandname, email, password, confirm_password, phone, brandDirection,latitude, longitude  } = args.about
        
        let postPrice = 500
            const already_exsist = await User.findOne({ email });
            if (already_exsist) {
            throw new GraphQLError("Email already exists");
        }

        if (password !== confirm_password) {
            throw new GraphQLError("Password and password confirmation must be the same");
        }

        
        if (password.length < 8){
            throw new GraphQLError("Weak password, the password should consist of 8 characters and have at least one number");
        }

        const avatarUrl = `${process.env.HOST}/defaultperson.svg`


        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        let math = Math.random() * (43564389374833)
        let confirmationCode = Math.round(math);

        let user

        if (brandname) {
           const brand_exist = await User.findOne({ email });
           const brandname_exist = await User.findOne({ brandname });
           if (brand_exist) {
            throw new GraphQLError("Email already exists");
        }
        if (brandname_exist) {
            throw new GraphQLError("Business name already exists");
        }
        user = new User({ fullname,email, passwordHash,address, role: "BUSINESS",websiteLink, confirmedEmail: false, confirmationCode, avatarUrl, balance: 0, brandname, physicalLocation: {latitude, longitude}, brandDirection, phone, postPrice, paidOut: 0, brandDescription: "", socialMedia: {instagram: "", facebook: "", twitter: ""}})
        } else{
            user = new User({ fullname,email, passwordHash, role: "USER",
            confirmedEmail: false, confirmationCode, avatarUrl, balance: 0,
            phone,
            reviewMedia: {}, 
            socialMedia: 
            {} 
        })
        }
            
            let result = await user.save()
            result = await serializeUser(result);

            const token = await issueAuthToken({email, role: user.role});
            return {token, user}
        },
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
                socialMedia: {instagram:{name: about.instagram}, facebook: {name: about.facebook}, twitter: {name: about.twitter}}
              },
              { new: true }
            );
              if (!user) {
                throw new GraphQLError("Something went wrong")
              }
            return "Done!";
          },  
          changeImage: async (parent, { image, id }, social, context, _info) => {
            const userFind = await User.findById(id);
            if (!userFind) {
              throw new GraphQLError("Business is undefined");
            }
            let images = [];
            
            for (let i = 0; i < image.length; i++) {
            const { createReadStream, filename, mimetype } = await image[i];
            const stream = createReadStream();
            const assetUniqName = fileRenamer(filename);
            let extension = mimetype.split("/")[1];
            const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
            await stream.pipe(fs.createWriteStream(pathName));
            const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
            images.push(urlForArray);
            }
            const user = await User.findByIdAndUpdate(
              id,
              {
                image: images[0]
              },
              { new: true }
            );
              if (!user) {
                throw new GraphQLError("Something went wrong")
              }
            return "Done!";
          },  
          changeLogo: async (parent, { image, id }, social, context, _info) => {
            const userFind = await User.findById(id);
            if (!userFind) {
              throw new GraphQLError("Business is undefined");
            }
            let images = [];
            
            for (let i = 0; i < image.length; i++) {
            const { createReadStream, filename, mimetype } = await image[i];
            const stream = createReadStream();
            const assetUniqName = fileRenamer(filename);
            let extension = mimetype.split("/")[1];
            const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
            await stream.pipe(fs.createWriteStream(pathName));
            const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
            images.push(urlForArray);
            }
            const user = await User.findByIdAndUpdate(
              id,
              {
                avatarUrl: images[0]
              },
              { new: true }
            );
              if (!user) {
                throw new GraphQLError("Something went wrong")
              }
            return "Done!";
          },           
        registerUserComplete: async (_, args, context, info) => {
            const {instagramUserName, instagramFollowers,
                facebookUserName, facebookFollowers,
                tiktokUserName, tiktokFollowers
            } = args.social
            const {googleReview, yelpReview, tripadvisorReview} = args.review
            if (!googleReview && !yelpReview && !tripadvisorReview) {
                throw new GraphQLError("Please select review service")
            }
            const user = await User.findById(
                args.id
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given- changestatus");
                }
                let images = [];
                    const {number,link, email} = info
                    for (let i = 0; i < args.images.length; i++) {
                    const { createReadStream, filename, mimetype } = await args.images[i];
                    const stream = createReadStream();
                    const assetUniqName = fileRenamer(filename);
                    let extension = mimetype.split("/")[1];
                    const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
                    await stream.pipe(fs.createWriteStream(pathName));
                    const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
                    images.push(urlForArray);
                    }
            const newuser = await User.findByIdAndUpdate(
                args.id,
                {            reviewMedia: {google: googleReview, yelp: yelpReview, tripadvisor: tripadvisorReview}, 
                socialMedia: 
                {instagram: {name: instagramUserName,followers: instagramFollowers}, 
                facebook: {name: facebookUserName,followers: facebookFollowers}, 
                tiktok: {name: tiktokUserName,followers: tiktokFollowers}, aproveScreenshots: images},  },
                { new: true }
            );
            if (!newuser) {
                throw new GraphQLError("Something went wrong!")
            }            
            const token = await issueAuthToken({email, role: user.role});
            return {token, user: newuser}
        },
        loginUser: async (_, args, context, info) => {
            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // let user
            // const { input, password } = args.about
            // if(emailRegex.test(input)) {
                
            //         user = await User.findOne(
            //             {email: input}
            //             );
            //             if (!user) {
            //                 throw new GraphQLError("Invalid email given");
            //         }
            // } else {
            //     user = await User.findOne(
            //         {nickname: input}
            //         );
            //         if (!user) {
            //             throw new GraphQLError("Invalid nickname given");
            //     }
            // }
            const {password, email} = args.about
            let user = await User.findOne(
            {email}
            );
            if (!user) {
            throw new GraphQLError("Invalid nickname given");
            }

            const isValidPass = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPass) {
                throw new GraphQLError("Invalid password given!");
            }
            let result = await user.save()
            result = await serializeUser(result);
            const token = await issueAuthToken({email: user.email, role: user.role});
            return {user, token}
        },
        sendConfirmedEmail: async(parent, {email}, context, info) => {
            try {
                if (!email) {
                    throw new GraphQLError("Enter all the data required !");
                }
            const user = await User.findOne({ email });
            if (!user) {
            throw new GraphQLError("Email undefined");
            }
            if (user.confirmedEmail == true){
                throw new GraphQLError("You already confirmed the email");
            }
            //transporter
            const transporter = nodemailer.createTransport(
                sendgridTransport({
                    auth:{
                        api_key:process.env.SENDGRID_APIKEY,
                    }
                })
            )
            let mailOptions = { from: process.env.FROM_EMAIL, to: email, subject: 'Account Verification Link', text: 'Hello '+ user.fullname +',\n\n' + 'Please verify your account by clicking the link: \nhttp://localhost:3000/' + 'auth/confirmation/' + user.confirmationCode + "-" + user.id + '\n\nThank You!\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
            }})
             //end trans
             return "Done"
            } catch (err) {
                throw (err.message);
            } 
        },
        changeStatus: async (parent,{id, confirmationCode}, args) => {
            const user = await User.findById(
                {_id:id}
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given- changestatus");
                }
                const isValidPass = (confirmationCode == user.confirmationCode);
            if (!isValidPass) {
                throw new GraphQLError("Invalid confirmationCode given!");
            }
            const newuser = await User.findByIdAndUpdate(
                id,
                {confirmedEmail: true},
                { new: true }
            );
            if (!newuser) {
                throw new GraphQLError("Something went wrong!")
            }
            return "Done"
        },
        forgotPassword: async (parent,{email, confirmationCode, password}, args) => {
            const user = await User.findOne(
                {email}
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given- changestatus");
                }
                const isValidPass = (confirmationCode == user.confirmationCode);
            if (!isValidPass) {
                throw new GraphQLError("Invalid confirmationCode given!");
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            const newuser = await User.findByIdAndUpdate(
                user.id,
                {passwordHash},
                { new: true }
            );
            if (!newuser) {
                throw new GraphQLError("Something went wrong!")
            }
            return "Done"
        },
        forgotPasswordSend: async (parent,{email}, args) => {
            const user = await User.findOne(
                {email}
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given- forgot password");
                }
                let math = Math.random() * (43564389374833)
                let newconfirmationCode = Math.round(math)
                const newuser = await User.findByIdAndUpdate(user.id, { confirmationCode: newconfirmationCode }, { new: true });
                if (!newuser) {
                    throw new GraphQLError("Something went wrong");
                }
                const transporter = nodemailer.createTransport(
            sendgridTransport({
                auth:{
                    api_key:process.env.SENDGRID_APIKEY,
                }
            })
        )
        let mailOptions = { from: process.env.FROM_EMAIL, to: user.email, subject: 'password recovery', text: 'Hello '+ user.fullname +',\n\n' + 'Type this code on website:' + newuser.confirmationCode };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { 
            return console.log(err)
        }})
            return "Send!"
        },
        acceptPosterPost: async (parent, {posterPostId}, context, info) => {
            const posterpost = await PosterPost.findOne({_id: posterPostId})
            if (!posterpost) {
                throw new GraphQLError("Post from poster is undefined")
            }
            if (posterpost.brandPendingPosts == true) {
                throw new GraphQLError("This post already accepted");
              }
            const brand = await User.findOne({_id: posterpost.brandId})
            if (!brand) {
                throw new GraphQLError("Such brand is undefined")
            }
            if (!brand.brandPendingPosts.includes(posterPostId)) {
                throw new GraphQLError("Requested post not found");
              }
            const newbrand = await User.findByIdAndUpdate(
                posterpost.brandId,
                { $pull: { brandPendingPosts: posterPostId }, $push: { brandCompletedPosts: posterPostId }, $inc: { paidOut: brand.postPrice }},
                { new: true }
              );   
              if (!newbrand) {
                throw new GraphQLError("Some problems with this business")
            }
            const newposterpost = await PosterPost.findByIdAndUpdate(
                posterPostId,
                {confirmed: true},
                { new: true }
            );
            if (!newposterpost) {
                throw new GraphQLError("Some problems with poster posts")
            }
            const newposter = await User.findByIdAndUpdate(
                posterpost.authorId,
                { $pull: { pendingPosts: posterPostId }, $push: { completedPosts: posterPostId }, $inc: { balance: brand.postPrice } },
                { new: true }
              );
              if (!newposter) {
                throw new GraphQLError("Some problems with this poster")
              }
            return "Accept"
        },
        declinePosterPost: async (parent, {posterPostId}, context, info) => {
            const posterpost = await PosterPost.findOne({_id: posterPostId})
            if (!posterpost) {
                throw new GraphQLError("Post from poster is undefined")
            }
            const brand = await User.findOne({_id: posterpost.brandId})
            if (!brand) {
                throw new GraphQLError("Business is undefined")
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
              
            return "Decline"
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
        createPosterPost: async (parent,{ image, post }) => {
            let images = [];
            
            for (let i = 0; i < image.length; i++) {
            const { createReadStream, filename, mimetype } = await image[i];
            const stream = createReadStream();
            const assetUniqName = fileRenamer(filename);
            let extension = mimetype.split("/")[1];
            const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
            await stream.pipe(fs.createWriteStream(pathName));
            const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
            images.push(urlForArray);
            }
            const {text, authorId, brandId, selectedReview,selectedSocial} = post
            const brand = await User.findById(brandId)
            if (!brand) {
                throw new GraphQLError("There is no such brand");
            }
            const postcreate = new PosterPost({ selectedReview,selectedSocial, text, authorId, brandId, images, confirmed: false })
            await postcreate.save()
            const newuser = await User.findByIdAndUpdate(
                authorId,
                { $push: { pendingPosts: postcreate.id} },
                { new: true }
            );
            const newrequest = await User.findByIdAndUpdate(
                brandId,
                { $push: { brandPendingPosts: postcreate.id} },
                { new: true }
            );
            return postcreate;
        },
        getBusiness: async(_parent, {brandname}, _context, _info) => {
            const user = await User.findOne(
                {brandname}
                );
                if (!user) {
                    throw new GraphQLError(`A brand called "${brandname}" does not exist`);
                }
                return {id: user.id,postPrice: user.postPrice}
        },
        //admin
        addAdmin: async (parent, {email}, args) => {
            const user = await User.findOne({ email });
            if (!user) {
            throw new GraphQLError("User is undefined");
        } 
        const newadmin = await User.findByIdAndUpdate(
            user.id,
            {role: "ADMIN"},
            { new: true }
        );
        if (!newadmin) {
            throw new GraphQLError("Something went wrong!")
        }
        return "Done"
        },
        //balance
        // topupBalance: async (_, args, context, info) => {
        //     const { email, money } = args
        //     const user = await User.findOne(
        //     {email}
        //     );
        //     if (!user) {
        //         throw new GraphQLError("Invalid email given");
        //     }
        //     const topUp = Number(money)
        //     const newbalance = topUp + user.balance
        //     const newuser = await User.findByIdAndUpdate(
        //         user.id,
        //         {balance: newbalance},
        //         { new: true }
        //     );
        //     return newuser
        // },
        // withdrawBalance: async (_, args, context, info) => {
        //     const { email, money } = args
        //     const user = await User.findOne(
        //     {email}
        //     );
        //     if (!user) {
        //         throw new GraphQLError("Invalid email given - widthDraw");
        //     }
        //     if (money > user.balance) {
        //         throw new GraphQLError("Not enough to withdraw");
        //     }
        //     const withdraw = Number(money)
        //     const newbalance = user.balance - withdraw
        //     const newuser = await User.findByIdAndUpdate(
        //         user.id,
        //         {balance: newbalance},
        //         { new: true }
        //     );
        //     return newuser
        // },
        //dev
        updatetoSchema: async (_, args, context, info) => {
            const {newfield, value} = args
            const user =  await User.updateMany(
                {},
                { $set: {[newfield] : value}}
            )
            return user
        }
    }
}

export default resolvers