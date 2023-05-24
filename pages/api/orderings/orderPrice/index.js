import { PrismaClient, SortOrder } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { type, category, order, brand, title } = req.query;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message: 'The "order" parameter must be "asc" or "desc".' });
  }

  try {
    const where = { hidden: false };

    if (type) where.type = type;
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (title) where.title = { contains: title, mode: 'insensitive' };

    const orderBy = {
      price: order === 'desc' ? SortOrder.desc : SortOrder.asc
    };

    const posts = await prisma.post.findMany({
      where,
      orderBy
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting data' });
  }
}

