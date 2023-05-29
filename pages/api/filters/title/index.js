import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const { name ,id} = req.query;
  if (req.method === "GET") {
    try {
      const postCountry = await prisma.user.findUnique({
        where: {
          id: id,
          },
          select:{
            country: true
          }
      });
      const {country} = postCountry
      const posts = await prisma.post.findMany({
        where: {
          author : {
            country: country
          },
          hidden:false,
          title: {
            contains: name.toLowerCase(), 
            mode: "insensitive", 
          },
        },
      });
      if (posts.length === 0) {
        return res.status(404).json({ message: "post not found" });
      }
      res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
