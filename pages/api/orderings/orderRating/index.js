import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
  const { order, type, category, brand } = req.query;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message: 'The "order" parameter must be "asc" or "desc".' });
  }

  try {
    let where = { hidden: false };

    if (category && type && brand) {//cuando existen todas
      where = { ...where, category, type, brand };
    } else if (!category && type && brand) {// cuando existe type y brand
      where = { ...where, type, brand };
    } else if (category && !type && brand) {// cuando existe category y brand 
      where = { ...where, category, brand };
    } else if (!category && !type && brand) {// cuando solo existe brand
      where = { ...where, brand };
    } else if (category && type && !brand) {// cuando existe solo category y type 
      where = { ...where, category, type };
    } else if (!category && type && !brand) {//cuando existe solo type
      where = { ...where, type };
    } else if (category && !type && !brand) {// cuando existe solo category 
      where = { ...where, category };
    }

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
