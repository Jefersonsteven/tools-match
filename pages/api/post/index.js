import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      title,
      content,
      photo,
      category,
      brand,
      status,
      price,
      type,
      authorId,
    } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        photo,
        category,
        brand,
        status,
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
    res.status(405).json({ message: "Método HTTP no permitido" });
  }
}
