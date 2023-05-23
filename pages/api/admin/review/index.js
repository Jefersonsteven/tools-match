import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          hidden: false,
        },
        include: {
          author: true,
          post: true,
          received: true,
        },
      });

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reviews" });
    }
  }
  if (req.method === "PUT") {
    try {
      const { userIds } = req.body;

      const users = await prisma.review.updateMany({
        where: {
          id: { in: userIds },
        },
        data: {
          hidden: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error deleting reviews." });
    }
  }
}
