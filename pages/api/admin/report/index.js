import prisma from "../../../../prisma/client";


export default async function handler(req, res) {
  const { userEmail, reason } = req.body;

  if (req.method === "POST") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail
        }
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const updatedUser = await prisma.user.update({
        
        where: {
          email: userEmail
        },
        data: {
          reports: [...user.reports, reason]
        }
      });
      res.status(200).json({message: "report added successfully"});
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }else{
    res.status(400).json({error: "Invalid request"});
  }
}

