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
      res.status(500).json({ message: "Error creating review" });
    }
  } else {
    res.status(405).json("Method Not Allowed");
  }
}
