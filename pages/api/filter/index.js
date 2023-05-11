import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, type } = req.query;

      if (category && type) {
        const posts = await prisma.post.findMany({
          where: {
            category: category,
            type: type,
          },
        });
        return res.status(201).json(posts);
      } else if (category && !type) {
        const posts = await prisma.post.findMany({
          where: {
            category: category,
          },
        });
        return res.status(201).json(posts);
      } else if (!category && type) {
        const posts = await prisma.post.findMany({
          where: {
            type: type,
          },
        });
        return res.status(201).json(posts);
      } else {
        return res.status(400).json({
          error: "Invalid query parameters. Please provide at least one valid parameter (category or type).",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid method." });
  }
}
