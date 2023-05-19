import { PrismaClient, SortOrder } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { type, category, order } = req.query;

  if (method === 'GET') {
    if (order !== 'asc' && order !== 'desc') {
      res.status(400).json({ message: 'El parámetro type debe ser "asc" o "desc".' });
      return;
    }

    try {
      let posts;
      if(!type && !category){
        posts = await prisma.post.findMany({
          orderBy: {
            price: order === 'desc' ? SortOrder.desc : SortOrder.asc
          }
        });
      }
      if (type && category) {
        posts = await prisma.post.findMany({
          where: {
            category: category,
            type: type
          },
          orderBy: {
            price: order === 'desc' ? SortOrder.desc : SortOrder.asc
          }
        });
      } else if (category && !type) {
        posts = await prisma.post.findMany({
          where: {
            category: category
          },
          orderBy: {
            price: order === 'desc' ? SortOrder.desc : SortOrder.asc
          }
        });
      } else if (type && !category){
        posts = await prisma.post.findMany({
          where: {
            type: type
            },
          orderBy: {
            price: order === 'desc' ? SortOrder.desc : SortOrder.asc
          }
        });
      }

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener datos' });
    }
  }
}