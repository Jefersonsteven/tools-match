
import prisma from "../../../../prisma/client";


export default async function handler(req, res) {
  const { method } = req;
  const { page , limit } = req.query;
  const intpage = parseInt(page);
  const intLimit = parseInt(limit); 

  if (method === 'GET') {
    try {
      if(!page || !limit){
        res.status(400).json({message: "enter valid elements"});
      }
      const skip = (intpage - 1) * intLimit;
      const users = await prisma.user.findMany({
        include: {
          posts: true,
          reviews: true,
          orders: true,
          payments: true,
          received: true,
        },
        skip: skip,
        take: intLimit,
      });
      const totalUser = await prisma.user.count();
      res.status(200).json({
        users: users,
        pageInfo: {
          page: intpage,
          limit: intLimit,
          totalPages: Math.ceil(totalUser / intLimit),
        },
      });
    } catch (error) {
      res.status(500).json({ message: "error internal server"});
    }
  }else {
    return res.status(400).json({ error: "Invalid method." });
  }
}
