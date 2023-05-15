import { PrismaClient, SortOrder } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { type } = req.query;
  if (method === 'GET') {
    // Validar que type sea 'asc' o 'desc'
    if (type !== 'asc' && type !== 'desc') {
      res.status(400).json({ message: 'El parámetro type debe ser "asc" o "desc".' });
      return;
    }
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          price: type === 'desc' ? SortOrder.desc : SortOrder.asc
        }
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener datos' });
    }
  }
}
