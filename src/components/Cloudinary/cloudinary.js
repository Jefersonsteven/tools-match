import { Cloudinary } from "cloudinary-core";

export const cloudinaryCore = new Cloudinary({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
