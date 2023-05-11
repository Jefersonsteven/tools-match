import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const order = await prisma.order.findUnique({
        where: { id: id },
        include: {
          payment: true,
          user: true,
        },
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving order" });
    }
  } else if (req.method === "PUT") {
    const { status, userId, postId, paymentId } = req.body;

    try {
      const updatedOrder = await prisma.order.update({
        where: { id },
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

      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating order" });
    }
  }
}
