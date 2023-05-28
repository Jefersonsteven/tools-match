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
      const post = await prisma.post.findMany({
        where: {
          author :{
            country: country
          }
        },
      });
      if(post.length===0){
        return res.status(404).json({message:"No posts found"});
      }
      res.status(200).json(post);
    }catch (error) {
      res.status(500).json({message:error.message});
    }
  }else{
    
  }
}