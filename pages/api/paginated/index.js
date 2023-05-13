import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { method } = req;
   const { page , limit } = req.query;
   const intpage = parseInt(page);
   const intLimit = parseInt(limit); 

  if (method === 'GET') {
    try {
      const skip = (intpage - 1) * intLimit;
      const posts = await prisma.post.findMany({
        include: {
          reviews: true,
        },
        skip: skip,
        take: intLimit,
      });
      const totalPosts = await prisma.post.count();
      res.status(200).json({
        posts: posts,
        pageInfo: {
          page: intpage,
          limit: intLimit,
          totalPages: Math.ceil(totalPosts / intLimit),
        },
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  }else {
    return res.status(400).json({ error: "Invalid method." });
  }
}
