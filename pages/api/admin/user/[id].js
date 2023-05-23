import prisma from "../../../../prisma/client";
import axios from "axios";
import getStaticMapUrlByZipCode from "../../maps/mapUtil";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
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
    } catch (error) {
      res.status(500).json({ error: "Error retrieving user." });
    }
  }
  if (req.method === "DELETE") {
    try {
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          hidden: true,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error deleting user." });
    }
  }
  if (req.method === "PUT") {
    try {
      const user = await prisma.user.update({
        where: {
          id: id,
        },
        include: {
          posts: true,
          reviews: true,
          orders: true,
          payments: true,
        },
        data: {
          ...req.body,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error updating user." });
    }
  }
}
