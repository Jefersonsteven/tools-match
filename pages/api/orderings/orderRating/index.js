import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { order, type, category, brand, title } = req.query;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message: 'The "order" parameter must be "asc" or "desc".' });
  }

  try {
    let where = { hidden: false };

    if (category) where.category = category;
    if (type) where.type = type;
    if (brand) where.brand = brand;
    if (title) where.title = { contains: title, mode: 'insensitive' };

    const include = {
      reviews: true
    };

    let posts;
    if (Object.keys(where).length === 1) {
      posts = await prisma.post.findMany({
        where: {
          hidden: false
        },
        include
      });
    } else {
      posts = await prisma.post.findMany({
        where,
        include
      });
    }

    const sortedPosts = posts.map((post) => ({
      ...post,
      avgRating: post.reviews.length > 0
        ? post.reviews.reduce((total, review) => total + review.rating, 0) / post.reviews.length
        : 0
    })).sort((a, b) => {
      if (a.reviews.length === 0 && b.reviews.length === 0) {
        return 0;
      } else if (a.reviews.length === 0) {
        return order === 'asc' ? -1 : 1;
      } else if (b.reviews.length === 0) {
        return order === 'asc' ? 1 : -1;
      } else {
        return order === 'asc' ? a.avgRating - b.avgRating : b.avgRating - a.avgRating;
      }
    });

    return res.status(200).json(sortedPosts);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
