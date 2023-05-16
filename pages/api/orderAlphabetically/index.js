import { PrismaClient, SortOrder } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { order, type, category } = req.query;
    console.log(order)
    try {
      let datos;
      if (type && category) {
        datos = await prisma.post.findMany({
          where: {
            type: type,
            category: category,
          },
          orderBy: {
            title: order === "Z-A" ? 'desc' : 'asc'
          }
        });
      } else if (category && !type) {
        datos = await prisma.post.findMany({
          where: {
            category: category,
          },
          orderBy: {
            title: order === "Z-A" ? 'desc' : 'asc'
          }
        });
      } else if (type) {
        datos = await prisma.post.findMany({
          where: {
            type: type,
          },
          orderBy: {
            title: order === "Z-A" ? 'desc' : 'asc'
          }
        });
      } else if(!type && !category) {
        datos = await prisma.post.findMany({
          orderBy: {
            title: order === "Z-A" ? 'desc' : 'asc'
          }
        });
      }
      res.status(200).json(datos);
    } catch (error) {
      res.status(500).json({ message: "error internal server"});
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}