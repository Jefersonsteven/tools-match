import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const reviews = await prisma.review.findMany({
        include: {
          author: true,
          post: true,
        },
      });

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reviews" });
    }
  }
}