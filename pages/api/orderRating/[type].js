import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { type } = req.query;
  if (method === 'GET') {
    if (type !== 'asc' && type !== 'desc') {
      res.status(400).json({ message: 'El parámetro type debe ser "asc" o "desc".' });
      return;
    }
    try {
      const posts = await prisma.post.findMany({
        include: {
          reviews: true,
        },
      });
      // Calcular el promedio de rating para cada post
      const postsWithAvgRating = posts.map((post) => ({
        ...post,
        avgRating: post.reviews.reduce((total, review) => total + review.rating, 0) / post.reviews.length,
      }));
      // Ordenar los resultados según el tipo especificado
      const sortedPosts = postsWithAvgRating.sort((a, b) =>
        type === 'asc' ? a.avgRating - b.avgRating : b.avgRating - a.avgRating
      );
      res.status(200).json(sortedPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }else{
    return res.status(400).json({ error: "Invalid method." });
  }
}
