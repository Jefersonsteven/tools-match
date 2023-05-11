import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    // Obtener todos los posts
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        reviews: true,
      },
    });
    res.status(200).json(post);
  } else if (req.method === "PUT") {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      include: {
        author: true,
        reviews: true,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(post);
  } else if (req.method === "DELETE") {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        hidden: true,
      },
    });
    res.status(200).json(post);
  } else {
    res.status(405).json({ message: "Método HTTP no permitido" });
  }
}
