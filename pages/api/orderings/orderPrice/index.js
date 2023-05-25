import { PrismaClient, SortOrder } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { type, category, order, brand } = req.query;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message: 'The "order" parameter must be "asc" or "desc".' });
  }

  try {
    let where = { hidden: false };

    if (type && category && brand) { // si existen todas
      where = { ...where, type, category, brand };
    } else if (!type && category && brand) {// si existe category y brand 
      where = { ...where, category, brand };
    } else if (type && !category && brand) {// si existe type y brand 
      where = { ...where, type, brand };
    } else if (category && !type && !brand) {// si solo existe category
      where = { ...where, category };
    } else if (type && !brand && !category) {// si solo existe type
      where = { ...where, type };
    } else if (!type && !category && brand) {// si solo existe brand
      where = { ...where, brand };
    } else if (category && type && !brand) {// si no existe brand
      where = { ...where, category, type };
    }

    const orderBy = {
      price: order === 'desc' ? SortOrder.desc : SortOrder.asc
    };

    let posts;
    if (Object.keys(where).length === 1) {
      posts = await prisma.post.findMany({
        where: {
          hidden: false
        },
        orderBy
      });
    } else {
      posts = await prisma.post.findMany({
        where,
        orderBy
      });
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting data' });
  }
}
