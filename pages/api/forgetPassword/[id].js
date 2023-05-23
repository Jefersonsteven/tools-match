import prisma from "../../../prisma/client";
import crypto from "crypto";

export default async function handler(req, res) {
  //endpoint para cambiar solo la contrasena
  const { id } = req.query;
  let { password } = req.body;
  if (req.method === "PUT") {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      password = crypto.createHash("sha256").update(data).digest("hex");
      const user = await prisma.user.update({
        where: {
          email: id,
        },
        data: {
          password,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
