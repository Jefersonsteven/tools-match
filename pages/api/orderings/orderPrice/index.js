import { PrismaClient, SortOrder } from '@prisma/client';
import { calcularDistancia } from '../../filters/distance/assets/calculateDistance';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { type, category, order, brand, title, coorde1, coorde2, km, id, country } = req.query;
  const intcoorde1 = parseFloat(coorde1);
  const intcoorde2 = parseFloat(coorde2);
  const intKm = parseFloat(km);

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message: 'The "order" parameter must be "asc" or "desc".' });
  }

  try {
    const where = { hidden: false };
    const include = {
      reviews: true,
      author: true
    };

    if (id && country !== "alls" || !country) {
      const postCountry = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          country: true
        }
      });
      const { country } = postCountry
      if (country) {
        where.author = {
          country: country
        }
      }
    }

    if (country) {
      if (country !== "alls") {
        where.author = {
          country: country
        }
      } else {
        delete where.author;
      }
    }

    if (type) where.type = type;
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (title) where.title = { contains: title, mode: 'insensitive' };

    if (coorde1 && coorde2 && km) {
      const posts = await prisma.post.findMany({
        where,
        include,
      });

      const filteredPosts = posts.filter((post) => {
        if (post.author && post.author.coordinates) {
          const [postCoorde1, postCoorde2] = post.author.coordinates;
          const distance = calcularDistancia(intcoorde1, intcoorde2, postCoorde1, postCoorde2);
          return distance < intKm;
        }
        return false;
      });

      filteredPosts.sort((a, b) => (order === 'desc' ? b.price - a.price : a.price - b.price));

      return res.status(200).json(filteredPosts);
    }

    const orderBy = {
      price: order === 'desc' ? SortOrder.desc : SortOrder.asc
    };

    const posts = await prisma.post.findMany({
      where,
      include,
      orderBy
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting data' });
  }
}
