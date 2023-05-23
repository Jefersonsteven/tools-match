import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { status, userId, postId, paymentId } = req.body;

    try {
      const order = await prisma.order.create({
        data: {
          status,
          userId,
          postId,
          paymentId,
        },
        include: {
          payment: true,
          user: true,
        },
      });
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating order" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
