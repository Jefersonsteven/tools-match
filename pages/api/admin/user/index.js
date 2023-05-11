import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        where: {
          hidden: false,
        },
        include: {
          posts: true,
          reviews: true,
          orders: true,
          payments: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving users." });
    }
  }
}