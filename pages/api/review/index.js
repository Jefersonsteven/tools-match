import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, rating, authorId, postId } = req.body;

    try {
      const review = await prisma.review.create({
        data: {
          title,
          content,
          rating,
          authorId,
          postId,
        },
        include: {
          author: true,
          post: true,
        },
      });

      res.status(201).json({ review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating review" });
    }
  } else if (req.method === "GET") {
    try {
      const reviews = await prisma.review.findMany({
        include: {
          author: true,
          post: true,
        },
      });

      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving reviews" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end("Method Not Allowed");
  }
}
