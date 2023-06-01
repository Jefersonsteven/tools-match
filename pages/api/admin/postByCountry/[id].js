import prisma from "../../../../prisma/client";

export default async function handler(req,res) {
  if (req.method === "GET") {
    try {
      const {id} = req.query;
      const postCountry = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          country: true,
        },
      });
      const  {country} = postCountry
      if(country) {
        const posts = await prisma.post.findMany({
          where: {
            hidden: false,
            author :{
              country: country
            }
          },
          include:{
            reviews: true
          }
        });
        res.status(200).json(posts);
      }
      else{
        const posts = await prisma.post.findMany({
          where: {
            hidden: false,
          },
          include: {
            author: true,
            reviews: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        res.status(200).json(posts);
      }
    }catch (error) {
      res.status(500).json({message:"error internal server"});
    }
  }else{
    res.status(400).json({message:"method not allowed"});
  }
}