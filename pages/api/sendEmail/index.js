import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_APLICATION,
    pass: process.env.PASSWORD_APLICATION,
  },
});

export default transporter
