import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, type, brand, title } = req.query;

      if (!category && !type && !brand && !title) {
        return res.status(400).json({
          error: "Invalid query parameters. Please provide at least one valid parameter (category, type, brand, or name).",
        });
      }

      let where = { hidden: false };

      if (category) {
        where.category = category;
      }

      if (type) {
        where.type = type;
      }

      if (brand) {
        where.brand = brand;
      }

      if (title) {
        where.title = {
          // Utilizamos `ilike` para una búsqueda aproximada sin distinguir mayúsculas y minúsculas
          contains: title,
          mode: "insensitive", // Ignorar la capitalización
        };
      }

      const posts = await prisma.post.findMany({ where });

      return res.status(201).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid method." });
  }
}
