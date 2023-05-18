import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { order, type, category } = req.query;
    try {
      let datos;
      if(!order) {
        res.status(400).json({message: "the order parameter must exist"})
      }
      if (type && category) {
        datos = await prisma.post.findMany({
          where: {
            type: type,
            category: category
          },
        });
      } else if (category && !type) {
        datos = await prisma.post.findMany({
          where: {
            category: category
          },
        });
      } else if (type) {
        datos = await prisma.post.findMany({
          where: {
            type: type
          },
        });
      } else if (!type && !category) {
        datos = await prisma.post.findMany({});
      }

      datos.sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));

      if (order && order.toLowerCase() === 'z-a') {
        datos.reverse();
      }

      res.status(200).json(datos);
    } catch (error) {
      res.status(500).json({ message: "error server internal" });
    }
  } else {
    res.status(405).json({ message: 'method not allowed' });
  }
}
