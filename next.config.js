/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "us.123rf.com",
      "res.cloudinary.com",
      "encrypted-tbn0.gstatic.com",
      "encrypted-tbn3.gstatic.com",
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn1.gstatic.com",
    ],
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
  },
};

module.exports = nextConfig;
