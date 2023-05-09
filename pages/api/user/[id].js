import { parse } from "postcss";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
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
      password,
      admin,
      logged,
      hidden,
      phoneNumber,
      zipCode,
    } = req.body;
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
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
      },
    });
    res.status(200).json(user);
  }
}
