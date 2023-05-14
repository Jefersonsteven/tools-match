/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["us.123rf.com", "res.cloudinary.com", "ejemplo.com","thumbs.dreamstime.com","www.beta-tools.com","www.evans.com.co","images-na.ssl-images-amazon.com", "cdn3.iconfinder.com"],
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,    
  },
};

module.exports = nextConfig;
