import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  //get, put para post por id
  const { id } = req.query;
  if (req.method === "GET") {
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
    const { title, content, photo, category, price, type, hidden, authorId } =
      req.body;
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        photo,
        category,
        price,
        type,
        hidden,
        authorId,
      },
      include: {
        author: true,
        reviews: true,
      },
    });
    res.status(200).json(post);
  }
}
