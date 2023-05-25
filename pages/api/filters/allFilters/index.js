import prisma from "../../../../prisma/client";
import { calcularDistancia } from "../distance/assets/calculateDistance";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, type, brand, title, coorde1, coorde2, km } = req.query;
      const intcoorde1 = parseFloat(coorde1);
      const intcoorde2 = parseFloat(coorde2);
      const intKm = parseFloat(km);

      if (!category && !type && !brand && !title && !coorde1 && !coorde2 && !km) {
        return res.status(400).json({
          error: "Invalid query parameters. Please provide at least one valid parameter (category, type, brand, or name).",
        });
      }

      let where = { hidden: false };

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
        where.title = {
          contains: title,
          mode: "insensitive",
        };
      }

      if (coorde1 && coorde2 && km) {
        const posts = await prisma.post.findMany({where, include: {
          author: true
        }
        });

        const filteredPosts = posts.filter((post) => {
          if (post.author && post.author.coordinates) {
            const [postCoorde1, postCoorde2] = post.author.coordinates;
            const floatposVorrde1  = parseFloat(postCoorde1);
            const floatpostCoorde2 = parseFloat(postCoorde2);
            const distance = calcularDistancia(intcoorde1, intcoorde2, floatposVorrde1, floatpostCoorde2);
            return distance < intKm;
          }
          return false;
        });

        return res.status(202).json(filteredPosts);
      }

      const posts = await prisma.post.findMany({ where });

      return res.status(201).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid method." });
  }
}

