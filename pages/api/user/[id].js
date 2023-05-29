import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: id,
        },
        include: {
          posts: { where: { hidden: false } },
          reviews: { where: { hidden: false } },
          orders: true,
          payments: true,
          received: true,
        },
      });
      if (user.favoritesId.length > 0) {
        const favPosts = await prisma.post.findMany({
          where: {
            id: {
              in: user.favoritesId,
            },
          },
        });
        user.favorites = favPosts;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving user." });
    }
  } else if (req.method === "PUT") {
    const {
      firstname,
      lastname,
      phoneNumber,
      zipCode,
      province,
      city,
      map,
      coordinates,
      country,
      photo,
      favoritesId,
    } = req.body;

    try {
      const user = await prisma.user.update({
        where: {
          email: id,
        },
        data: {
          firstname,
          lastname,
          phoneNumber,
          country,
          province,
          city,
          zipCode,
          map,
          coordinates,
          country,
          photo,
          favoritesId,
        },
        include: {
          posts: true,
          reviews: true,
          orders: true,
          payments: true,
          received: true,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error updating user." });
    }
  }
}
