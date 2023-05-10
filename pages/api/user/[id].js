import { parse } from "postcss";
import prisma from "../../../prisma/client";
const bcrypt = require('bcryptjs')

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: id,
      },
      include: {
        posts: true,
        reviews: true,
        orders: true,
        payments: true,
      },
    });
    res.status(200).json(user);
  } else if (req.method === "PUT") {
    const {
      firstname,
      lastname,
      email,
      admin,
      logged,
      hidden,
      phoneNumber,
      zipCode,
      reports,
    } = req.body;
    let { 
      password 
    } = req.body
    const rondasDeSal = 10
    password = await bcrypt.hash(password, rondasDeSal)
    const user = await prisma.user.update({
      where: {
        email: id,
      },
      data: {
        firstname,
        lastname,
        email,
        password,
        admin,
        logged,
        hidden,
        phoneNumber,
        zipCode,
        reports,
      },
    });
    res.status(200).json(user);
  }
}
