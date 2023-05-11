import prisma from "../../../../prisma/client";

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
  }
  if (req.method === "PUT") {
    const { id } = req.query;
    const { amount, currency, userId } = req.body;
    try {
      const payment = await prisma.payment.update({
        where: {
          id: id,
        },
        data: {
          amount,
          currency,
          userId,
        },
        include: {
          user: true,
        },
      });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: "Error updating payment" });
    }
  }
}
