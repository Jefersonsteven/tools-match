import prisma from "../../../../prisma/client";

export default async function handler(req, res) {
  const { email } = req.query;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        },
        select: {
          reports: true
        }
      });
      const {reports} = user;
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if(reports.length===0) {
        return res.status(404).json({ error: "User has no reports" });
      }

      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
