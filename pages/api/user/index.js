import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        admin,
        logged,
        hidden,
        phoneNumber,
        zipCode,
      } = req.body;
      const user = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password,
          admin,
          logged,
          hidden,
          phoneNumber,
          zipCode,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user." });
    }
  } else if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        include: {
          posts: true,
          reviews: true,
          orders: true,
          payments: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving users." });
    }
  } else {
    res.status(400).json({ error: "Invalid method." });
  }
}
