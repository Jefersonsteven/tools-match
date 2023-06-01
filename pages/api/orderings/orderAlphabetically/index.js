import prisma from "../../../../prisma/client";
import { calcularDistancia } from '../../filters/distance/assets/calculateDistance';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, type, brand, title, coorde1, coorde2, km, order, id, country } = req.query;
      const intcoorde1 = parseFloat(coorde1);
      const intcoorde2 = parseFloat(coorde2);
      const intKm = parseFloat(km);

      if (!order) {
        return res.status(400).json({ error: "The order parameter must exist." });
      }

      let where = { hidden: false };
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

      if (category) {
        where.category = category;
      }

      if (type) {
        where.type = type;
      }

      if (brand) {
        where.brand = brand;
      }

      if (title) {
        const titleTrim = title.trim();
        where.title = {
          contains: titleTrim,
          mode: "insensitive",
        };
      }

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

        filteredPosts.sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));

        if (order.toLowerCase() === "z-a") {
          filteredPosts.reverse();
        }

        return res.status(200).json(filteredPosts);
      }

      const posts = await prisma.post.findMany({ where, include });

      posts.sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));

      if (order.toLowerCase() === "z-a") {
        posts.reverse();
      }

      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid method." });
  }
}
