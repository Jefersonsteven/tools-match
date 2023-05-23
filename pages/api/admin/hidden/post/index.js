import prisma from "../../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Obtener todos los posts
    const posts = await prisma.post.findMany({
      where: {
        hidden: true,
      },
      include: {
        author: true,
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(posts);
  }
  if (req.method === "PUT") {
    try {
      const { userIds } = req.body;

      const users = await prisma.post.updateMany({
        where: {
          id: { in: userIds },
        },
        data: {
          hidden: false,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error saving posts." });
    }
  } else {
    res.status(405).json({ message: "Método HTTP no permitido" });
  }
}
