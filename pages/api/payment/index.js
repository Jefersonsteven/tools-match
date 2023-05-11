import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount, currency, userId } = req.body;
    try {
      const payment = await prisma.payment.create({
        data: {
          amount,
          currency,
          userId,
        },
        include: {
          user: true,
        },
      });
      res.status(201).json({ payment });
    } catch (error) {
      res.status(500).json({ message: "Error creating payment" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
