import { parse } from "postcss";
import prisma from "../../../prisma/client";
const crypto = require('crypto');

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
    const { firstname, lastname, phoneNumber, zipCode } = req.body;
    let { password } = req.body
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    password = crypto.createHash('sha256').update(data).digest('hex');
    try {
      const user = await prisma.user.update({
        where: {
          email: id,
        },
        data: {
          firstname,
          lastname,
          password,
          phoneNumber,
          zipCode,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error updating user." });
    }
  }
}
