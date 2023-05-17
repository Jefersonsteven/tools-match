import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const review = await prisma.review.findUnique({
        where: {
          id: id,
        },
        include: {
          author: true,
          post: true,
          received: true,
        },
      });

      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving review" });
    }
  } else if (req.method === "PUT") {
    const { title, content, rating } = req.body;

    try {
      const review = await prisma.review.update({
        where: {
          id: id,
        },
        data: {
          title,
          content,
          rating,
        },
      });

      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating review" });
    }
  }
}
