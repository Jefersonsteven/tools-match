import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Crear un nuevo post
    const { title, content, photo, category, price, type, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        photo,
        category,
        price,
        type,
        authorId,
      },
      include: {
        author: true,
        reviews: true,
      },
    });
    res.status(201).json(post);
  } else {
    // Devolver un error para cualquier otro método HTTP
    res.status(405).json({ message: "Método HTTP no permitido" });
  }
}
