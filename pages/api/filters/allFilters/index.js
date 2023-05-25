import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, type, brand } = req.query;

      if (!category && !type && !brand) {
        return res.status(400).json({
          error: "Invalid query parameters. Please provide at least one valid parameter (category, type, or brand).",
        });
      }

      const queryParams = [
        { condition: category && type && brand, where: { category, type, brand, hidden: false} },
        { condition: category && type && !brand, where: { category, type,hidden: false } },
        { condition: !category && type && brand, where: { brand, type,hidden: false } },
        { condition: category && !type && brand, where: { brand, category,hidden: false } },
        { condition: category && !type && !brand, where: { category,hidden: false } },
        { condition: !category && type && !brand, where: { type,hidden: false } },
        { condition: !category && !type && brand, where: { brand,hidden: false } },
      ];

      for (const { condition, where } of queryParams) {
        if (condition) {
          const posts = await prisma.post.findMany({ where });
          return res.status(201).json(posts);
        }
      }

      return res.status(400).json({
        error: "Invalid query parameters. Please provide at least one valid parameter (category, type, or brand).",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid method." });
  }
}
