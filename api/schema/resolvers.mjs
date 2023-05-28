import User from '../models/User.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileRenamer } from "../helpers/FileRenamer.js";
import { issueAuthToken, serializeUser } from "../helpers/index.js";
import path from "path";
import fs from  'fs'
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { GraphQLError } from 'graphql';
import { createUploadStream } from '../modules/streams.js';
import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport';
import validatePassword from '../helpers/validatePassword.js';
import BrandPost from '../models/BrandPost.js';
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
        //brand
        getAllPendingPosterPostsforBrand:async(_parent, {id}, _context, _info) => {
            const brandpost = await BrandPost.findById(id)
            if (!brandpost) {
                throw new GraphQLError("Invalid id given");
            }
            const list = await Promise.all(
                brandpost.requestsId.map((post) => {
                    // return BrandPost.findById(post)
                    return PosterPost.findById(post)
                }),
                )
            return list
        }, 
        getAllCompletedPosterPostsforBrand:async(_parent, {id}, _context, _info) => {
            const brandpost = await BrandPost.findById(id)
            if (!brandpost) {
                throw new GraphQLError("Invalid id given");
            }
            const list = await Promise.all(
                brandpost.acceptedId.map((post) => {
                    // return BrandPost.findById(post)
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
                    // return BrandPost.findById(post)
                    return PosterPost.findById(post)
                }),
                )
            return list
        },
        getAllCompletedBrandPosts: async(_parent, {id}, _context, _info) => {
            const user = await User.findById(id)
            if (!user) {
                throw new GraphQLError("Invalid id given");
            }
            const list = await Promise.all(
                user.completedPosts.map((post) => {
                    // return BrandPost.findById(post)
                    return PosterPost.findById(post)
                }),
                )
            return list
        }
    },
    Mutation: {
        //authorisation
        registerUser: async(parent, args, context, info) => {
                const { fullname, brandname, email, password, confirm_password } = args.about
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

        const avatarUrl = `${process.env.HOST}/defaultperson.png`


        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        let math = Math.random() * (43564389374833)
        let confirmationCode = Math.round(math);

        let user

        if (brandname) {
           const brand_exist = await User.findOne({ email });
           if (brand_exist) {
            throw new GraphQLError("Email already exists");
        }
        user = new User({ fullname,email, passwordHash, role: "BRAND", confirmedEmail: false, confirmationCode, avatarUrl, balance: 0, brandname, physicalLocation: ""})
        } else{
            user = new User({ fullname,email, passwordHash, role: "USER", confirmedEmail: false, confirmationCode, avatarUrl, balance: 0})
        }
            
            let result = await user.save()
            result = await serializeUser(result);

            const transporter = nodemailer.createTransport(
                sendgridTransport({
                    auth:{
                        api_key:process.env.SENDGRID_APIKEY,
                    }
                })
            )
            let mailOptions = { from: process.env.FROM_EMAIL, to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.fullname +',\n\n' + 'Please verify your account by clicking the link: \nhttp://localhost:3000/' + 'auth/confirmation/' + confirmationCode + "&" + user.id + '\n\nThank You!\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { 
                    throw new GraphQLError(err);
            }})
            const token = await issueAuthToken({email, role: user.role});
            return {token, user}
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

            let user = await User.findOne(
            {nickname: input}
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
                return console.log(err)
            }})
             //end trans
            return {user}
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
            return newuser
        },
        forgotPassword: async (parent,{id, confirmationCode, password}, args) => {
            const user = await User.findOne(
                {_id:id}
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
                id,
                {passwordHash},
                { new: true }
            );
            return newuser
        },
        forgotPasswordSend: async (parent,{email}, args) => {
            const user = await User.findOne(
                {email}
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given- forgot password");
                }
        const transporter = nodemailer.createTransport(
            sendgridTransport({
                auth:{
                    api_key:process.env.SENDGRID_APIKEY,
                }
            })
        )
        let mailOptions = { from: process.env.FROM_EMAIL, to: user.email, subject: 'password recovery', text: 'Hello '+ user.fullname +',\n\n' + 'Please verify your account by clicking the link: \nhttp://localhost:3000/' + 'forgot-password/' + user.confirmationCode + "&" + user.id + '\n\nThank You!\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) { 
            return console.log(err)
        }})
            return "Send!"
        },
        //poster
        addSocialMediaPoster: async (parent, {info, image}, args) => {
            let images = [];
            const {number,link, email} = info
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
            let math = Math.random() * (43564389374833)
            let socialMediaId = Math.round(math);
            const user = await User.findOne(
                {email}
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given");
            }
            console.log(info)
            const newuser = await User.findByIdAndUpdate(
                user.id,
                { $push: { socialMedia: {images, number, link, id: socialMediaId} } },
                { new: true }
            );
            return newuser
        },
        deleteSocialMediaPoster: async (parent, { id, email }, args) => {
            console.log(id)
            try {
              const user = await User.findOneAndUpdate(
                { email },
                { $pull: { socialMedia: { id } } },
                { new: true }
              );
              
          
              if (!user) {
                throw new GraphQLError("Invalid email given");
              }
          
              return user;
            } catch (error) {
              throw new GraphQLError("Failed to delete social media", error);
            }
        },          

        //Brand
        addSocialMediaBrand: async (parent, {info}, args) => {
            const {number,link, email} = info
            let math = Math.random() * (43564389374833)
            let socialMediaId = Math.round(math);
            const user = await User.findOne(
                {email}
                );
                if (!user) {
                    throw new GraphQLError("Invalid email given");
            }
            console.log(info)
            const newuser = await User.findByIdAndUpdate(
                user.id,
                { $push: { socialMedia: {number, link, id: socialMediaId} } },
                { new: true }
            );
            return newuser
        },
        deleteSocialMediaBrand: async (parent, { id, email }, args) => {
            console.log(id)
            try {
              const user = await User.findOneAndUpdate(
                { email },
                { $pull: { socialMedia: { id } } },
                { new: true }
              );
              
          
              if (!user) {
                throw new GraphQLError("Invalid email given");
              }
          
              return user;
            } catch (error) {
              throw new GraphQLError("Failed to delete social media", error);
            }
        },       
        // createBrandPost: async (parent,{ image, post }) => {
        //     let images = [];
            
        //     for (let i = 0; i < image.length; i++) {
        //     const { createReadStream, filename, mimetype } = await image[i];
        //     const stream = createReadStream();
        //     const assetUniqName = fileRenamer(filename);
        //     let extension = mimetype.split("/")[1];
        //     const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
        //     await stream.pipe(fs.createWriteStream(pathName));
        //     const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
        //     images.push(urlForArray);
        //     }
        //     const {title, requirements, authorId, payment, quantity} = post
        //     const postcreate = new BrandPost({ title, requirements,payment, authorId, images, quantity })
        //     await postcreate.save()
        //     const newuser = await User.findByIdAndUpdate(
        //         authorId,
        //         { $push: { BrandPosts: postcreate.id} },
        //         { new: true }
        //     );
        //     return postcreate;
        // },
        // updateBrandPost: async (parent,{ image, post }) => {
        //     let images = [];
            
        //     for (let i = 0; i < image.length; i++) {
        //     const { createReadStream, filename, mimetype } = await image[i];
        //     const stream = createReadStream();
        //     const assetUniqName = fileRenamer(filename);
        //     let extension = mimetype.split("/")[1];
        //     const pathName = path.join(__dirname,   `./uploads/${assetUniqName}.${extension}`);
        //     await stream.pipe(fs.createWriteStream(pathName));
        //     const urlForArray = `${process.env.HOST}/${assetUniqName}.${extension}`;
        //     images.push(urlForArray);
        //     }
        //     const {title, requirements, id} = post
        //     console.log(post)
        //     const postcreate = await BrandPost.findByIdAndUpdate(
        //         id,
        //         {title, requirements, images},
        //         { new: true }
        //     );
        //     return postcreate
        // },
        // deleteBrandPost: async (parent, args, context, info) => {
        //     const { id } = args
        //     console.log(id)
        //     const brandpost = await BrandPost.findById(id)
        //     if (!brandpost) {
        //         throw new GraphQLError("Post is undefined");
        //     }
        //     brandpostdelete = await BrandPost.findByIdAndDelete(id)
        //     const user = await User.findByIdAndUpdate(
        //         brandpost.authorId,
        //         {$pull: { BrandPosts: id}},
        //         { new: true }
        //     );
        //     return "Post deleted"
        // },
        acceptPosterPost: async (parent, {brandId, posterPostId}, context, info) => {
            const posterpost = await PosterPost.findOne({_id: posterPostId})
            if (!posterpost) {
                throw new GraphQLError("Post from poster is undefined")
            }
            const brand = await User.findOne({_id: brandId})
            if (!brand) {
                throw new GraphQLError("Such brand is undefined")
            }
            if (!brand.brandPendingPosts.includes(posterPostId)) {
                throw new GraphQLError("Requested post not found");
              }
            const newbrand = await User.findByIdAndUpdate(
                brandId,
                { $pull: { brandPendingPosts: posterPostId }, $push: { brandCompletedPosts: posterPostId }},
                { new: true }
              );              
            const newposterpost = await PosterPost.findByIdAndUpdate(
                posterPostId,
                {confirmed: true},
                { new: true }
            );
            const newposter = await User.findByIdAndUpdate(
                posterpost.authorId,
                { $pull: { pendingPosts: posterPostId }, $push: { completedPosts: posterPostId }, $inc: { balance: brand.postPrice } },
                { new: true }
              );
              
            return "Accept"
        },
        declinePosterPost: async (parent, {brandId, posterPostId}, context, info) => {
            const posterpost = await PosterPost.findOne({_id: posterPostId})
            if (!posterpost) {
                throw new GraphQLError("Post from poster is undefined")
            }
            const brandpost = await BrandPost.findOne({_id: brandPostId})
            if (!brandpost) {
                throw new GraphQLError("Post from brand is undefined")
            }
            if (!brandpost.requestsId.includes(posterPostId)) {
                throw new GraphQLError("Requested post not found");
              }
            const newbrandpost = await BrandPost.findByIdAndUpdate(
                brandPostId,
                { $pull: { requestsId: posterPostId } },
                { new: true }
              );              
            const newposter = await User.findByIdAndUpdate(
                posterpost.authorId,
                { $pull: { pendingPosts: posterPostId } },
                { new: true }
              );
              
            return "Decline"
        },
        addLocation: async (parent, {latitude, longitude, id}, context, info) => {
            const user = await User.findById(id)
            if (!user) {
                throw new GraphQLError("User is undefined")
            }

            user.physicalLocation = {
                latitude: latitude,
                longitude: longitude,
              };
          
              // Сохранение обновленного пользователя
              await user.save();
              return "Done!"
        },
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
            const {title, text, authorId, brandId} = post
            const brand = await User.findById(brandId)
            if (!brand) {
                throw new GraphQLError("There is no such brand");
            }
            const postcreate = new PosterPost({ title, text, authorId, brandId, images, confirmed: false })
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
        return newadmin
        },
        //balance
        topupBalance: async (_, args, context, info) => {
            const { email, money } = args
            const user = await User.findOne(
            {email}
            );
            if (!user) {
                throw new GraphQLError("Invalid email given");
            }
            const topUp = Number(money)
            const newbalance = topUp + user.balance
            const newuser = await User.findByIdAndUpdate(
                user.id,
                {balance: newbalance},
                { new: true }
            );
            return newuser
        },
        withdrawBalance: async (_, args, context, info) => {
            const { email, money } = args
            const user = await User.findOne(
            {email}
            );
            if (!user) {
                throw new GraphQLError("Invalid email given - widthDraw");
            }
            if (money > user.balance) {
                throw new GraphQLError("Not enough to withdraw");
            }
            const withdraw = Number(money)
            const newbalance = user.balance - withdraw
            const newuser = await User.findByIdAndUpdate(
                user.id,
                {balance: newbalance},
                { new: true }
            );
            return newuser
        },
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