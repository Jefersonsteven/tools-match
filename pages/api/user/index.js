import prisma from "../../../prisma/client";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        firstname,
        lastname,
        email,
        admin,
        logged,
        hidden,
        phoneNumber,
        zipCode,
        reports,
      } = req.body;
      let { password } = req.body;
      const rondasDeSal = 10;
      password = await bcrypt.hash(password, rondasDeSal);
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
          reports,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user." });
    }
  } else {
    res.status(400).json({ error: "Invalid method." });
  }
}
