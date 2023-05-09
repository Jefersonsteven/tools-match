import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        adress,
        city,
        country,
        profilePhoto,
        publications,
      } = req.body;
      try {
        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            adress,
            city,
            country,
            profilePhoto,
            publications,
          },
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
