import prisma from "../../../prisma/client";

export default async  function handler(req, res) {
  if (req.method === "GET") {
    try {
      const titles = await prisma.post.findMany({
        select: {
          title: true,
          type: true,
          category: true,
        },
      });
    /*   const categorys = await prisma.post.findMany({
        select: {
          category: true
        },
      }); */
     /*  const types = await prisma.post.findMany({
        select: {
          type: true
        },
      }); */
      res.status(200).json(titles);
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  }else{
    res.status(400).json({ error: "Invalid method." });
  }
}