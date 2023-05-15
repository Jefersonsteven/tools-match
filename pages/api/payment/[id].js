import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  //metodos put y get por id para payment
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const payment = await prisma.payment.findUnique({
        where: {
          id: id,
        },
        include: {
          user: true,
          order: true,
        },
      });
      res.status(200).json({ payment });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving payment" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
