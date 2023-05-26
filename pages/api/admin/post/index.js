import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Obtener todos los posts
    const posts = await prisma.post.findMany({
      where: {
        hidden: false,
      },
      include: {
        author: true,
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(posts);
  }
  if (req.method === "PUT") {
    try {
      const { userIds } = req.body;

      const users = await prisma.post.updateMany({
        where: {
          id: { in: userIds },
        },
        data: {
          hidden: true,
        },
      });

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error deleting posts." });
    }
  } else {
    return res.status(405).json({ message: "Método HTTP no permitido" });
  }
}
