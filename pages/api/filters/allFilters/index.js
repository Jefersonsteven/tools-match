import { auth } from "@/firebase/firebase.config";
import prisma from "../../../../prisma/client";
import { calcularDistancia } from "../distance/assets/calculateDistance";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { category, type, brand, title, coorde1, coorde2, km, id, country } = req.query;
      const intcoorde1 = parseFloat(coorde1);
      const intcoorde2 = parseFloat(coorde2);
      const intKm = parseFloat(km);

      if (!category && !type && !brand && !title && !coorde1 && !coorde2 && !km && !country && !id && !country) {
        return res.status(400).json({
          error: "Invalid query parameters. Please provide at least one valid parameter (category, type, brand, or name).",
        });
      }

      let where = { hidden: false };
      const include = {
        reviews: true,
        author: true
      };

      if (id &&  !country) {
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
        where.title = {
          contains: title,
          mode: "insensitive",
        };
      }

      if (coorde1 && coorde2 && km) {
        const posts = await prisma.post.findMany({
          where,
          include
        });

        const filteredPosts = posts.filter((post) => {
          if (post.author && post.author.coordinates) {
            const [postCoorde1, postCoorde2] = post.author.coordinates;
            const floatposVorrde1 = parseFloat(postCoorde1);
            const floatpostCoorde2 = parseFloat(postCoorde2);
            const distance = calcularDistancia(intcoorde1, intcoorde2, floatposVorrde1, floatpostCoorde2);
            return distance < intKm;
          }
          return false;
        });

        return res.status(202).json(filteredPosts);
      }

      const posts = await prisma.post.findMany({ where, include });

      return res.status(201).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid method." });
  }
}
