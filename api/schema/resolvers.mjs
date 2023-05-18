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
import validatePassword from '../helpers/validatePassword.js';
const __dirname = path.resolve();
dotenv.config()
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  });

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
    },
    Mutation: {
        registerUser: async(parent, args, context, info) => {
                const { fullname, nickname, email, password, choose_role, confirm_password } = args.about
            const already_exsist = await User.findOne({ email });
            if (already_exsist) {
            throw new GraphQLError("Email already exists");
        }
        const already_exsist_nick = await User.findOne({ email });
        if (already_exsist_nick) {
        throw new GraphQLError("Nickname already exists");
        }

            if (password !== confirm_password) {
                throw new GraphQLError("Password and password confirmation must be the same");
            }

            if (validatePassword(password)){

            } else{
                throw new GraphQLError("Weak password, the password should consist of 8 characters and have at least one number");
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);


            const user = new User({ fullname,nickname, email, passwordHash, role: "ADMIN", confirmedEmail: false})
            let result = await user.save()
            result = await serializeUser(result);
            const token = await issueAuthToken({id, email});
            return {token, user}
        },
        loginUser: async (_, args, context, info) => {
            const { email, password, roles, id } = args.about
            const user = await User.findOne(
            {email}
            );
            if (!user) {
                throw new GraphQLError("Invalid email given");
            }
            const isValidPass = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPass) {
                throw new GraphQLError("Invalid password given!");
            }
            let result = await user.save()
            result = await serializeUser(result);
            const token = await issueAuthToken({id, email});
            return {user, token}
        },
    }
}

export default resolvers