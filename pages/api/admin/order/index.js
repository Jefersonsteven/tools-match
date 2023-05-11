import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        include: {
          payment: true,
          user: true,
        },
      });

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving orders" });
    }
  }
}
