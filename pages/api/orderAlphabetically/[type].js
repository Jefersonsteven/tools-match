import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { type } = req.query;
    console.log(type)
    try {
      if (type === "A-Z") {
        const datos = await prisma.user.findMany({
          orderBy: {
            firstname: 'asc'
          }
        });
        res.status(200).json(datos);
      } else if (type === "Z-A") {
        const datos = await prisma.user.findMany({
          orderBy: {
            firstname: 'desc'
          }
        });
        res.status(200).json(datos);  
      }else {
        res.status(400).json({message: "the type entered is not correct"})
      }  
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
