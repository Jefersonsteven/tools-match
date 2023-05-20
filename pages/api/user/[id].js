import { parse } from "postcss";
import prisma from "../../../prisma/client";
import crypto from "crypto";
import getStaticMapUrlByZipCode from "../maps/mapUtil";

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
        received: true,
      },
    });

    res.status(200).json(user);
  } else if (req.method === "PUT") {
    const { firstname, lastname, phoneNumber, zipCode, map, country, photo } =
      req.body;
    let { password } = req.body;
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    password = crypto.createHash("sha256").update(data).digest("hex");
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
          country,
          zipCode,
          map,
          country,
          photo,
        },
      });
      if (user.map === null) {
        if (user.zipCode && user.country) {
          const mapLink = await getStaticMapUrlByZipCode(
            user.zipCode,
            user.country
          );
          const userMap = await prisma.user.update({
            where: {
              email: id,
            },
            data: {
              map: mapLink,
            },
          });
          user.map = userMap.map;
        }
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error updating user." });
    }
  }
}
