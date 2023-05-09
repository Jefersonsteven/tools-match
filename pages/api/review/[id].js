import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const review = await prisma.review.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          author: true,
          post: true,
        },
      });

      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving review" });
    }
  } else if (req.method === "PUT") {
    const { title, content, rating, hidden } = req.body;

    try {
      const review = await prisma.review.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          content,
          rating,
          hidden,
        },
        include: {
          author: true,
          post: true,
        },
      });

      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating review" });
    }
  }
}
