/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "www.google.com",
      "www.homedepot.com.mx",
      "encrypted-tbn0.gstatic.com",
      "maps.googleapis.com",
    ],
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    URL_API: process.env.URL_API
  },
};

module.exports = nextConfig;
