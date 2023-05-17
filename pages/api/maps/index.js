import getLinkMapByZipCode from "./mapUtil";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { zipCode, country } = req.body;
    try {
      const mapLink = await getLinkMapByZipCode(zipCode, country);
      res.status(200).json(mapLink);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
