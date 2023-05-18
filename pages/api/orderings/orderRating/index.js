import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { order, type , category } = req.query;
  if (method === 'GET') {
    if (order !== 'asc' && order !== 'desc') {
      res.status(400).json({ message: 'El parámetro order debe ser "asc" o "desc".' });
      return;
    }
    try {
      let posts;
      if (category && type) {
        posts = await prisma.post.findMany({
          where: {
            category: category,
            type: type,
          },
          include: {
            reviews: true
          }
        });
      } else if (!category && type) {
        posts = await prisma.post.findMany({
          where: {
            type: type,
          },
          include: {
            reviews: true
          }
        });
      } else if (category && !type) {
        posts = await prisma.post.findMany({
          where: {
            category: category,
          },
          include: {
            reviews: true
          }
        });
      } else if (!category && !type) {
        posts = await prisma.post.findMany({
          include: {
            reviews: true
          }
        });
      }
      // Calcular el promedio de rating para cada post
      const postsWithAvgRating = posts.map((post) => ({
        ...post,
        avgRating: post.reviews.reduce((total, review) => total + review.rating, 0) / post.reviews.length,
      }));
      // Ordenar los resultados según el tipo especificado
      const sortedPosts = postsWithAvgRating.sort((a, b) => {
        if (a.reviews.length === 0 && b.reviews.length === 0) {
          return 0;
        } else if (a.reviews.length === 0) {
          return order === 'asc' ? -1 : 1; // si es ascendente, quedan primero; si es descendente, quedan al final
        } else if (b.reviews.length === 0) {
          return order === 'asc' ? 1 : -1; // si es ascendente, quedan al final; si es descendente, quedan primero
        } else {
          return order === 'asc' ? a.avgRating - b.avgRating : b.avgRating - a.avgRating;
        }
      });
      res.status(200).json(sortedPosts);
    } catch (error) {
      res.status(500).json({ message: "error internal server" });
    }
  } else {
    return res.status(400).json({ error: "Invalid method." });
  }
}

