import { S3Client } from "@aws-sdk/client-s3";

export const bucket = process.env.BUCKET_NAME;

export const s3 = new S3Client({
  // endpoint: "http://localhost:4000/graphql",
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
  
  // forcePathStyle: true,
  // sslEnabled: false,
});