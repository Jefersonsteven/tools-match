import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { order, type, category, brand } = req.query;

  if (!order) {
    return res.status(400).json({ message: 'The order parameter must exist' });
  }

  try {
    const where = {
      hidden: false
    };

    if (type) where.type = type;
    if (category) where.category = category;
    if (brand) where.brand = brand;

    let datos;

    if (type && category && brand) {
      datos = await prisma.post.findMany({ where });
    } else if (!type && category && brand) {
      datos = await prisma.post.findMany({ where });
    } else if (type && !category && brand) {
      datos = await prisma.post.findMany({ where });
    } else if (category && !type && !brand) {
      datos = await prisma.post.findMany({ where });
    } else if (type && !brand && !category) {
      datos = await prisma.post.findMany({ where });
    } else if (type && !brand && category) {
      datos = await prisma.post.findMany({ where });
    } else if (!type && !category && brand) {
      datos = await prisma.post.findMany({ where });
    } else if (!type && !category && !brand) {
      datos = await prisma.post.findMany({ where });
    } else {
      return res.status(400).json({ message: 'Invalid query parameters' });
    }

    datos.sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));

    if (order.toLowerCase() === 'z-a') {
      datos.reverse();
    }

    return res.status(200).json(datos);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

