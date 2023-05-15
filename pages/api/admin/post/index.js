import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Obtener todos los posts
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(posts);
  } else {
    res.status(405).json({ message: "Método HTTP no permitido" });
  }
}
