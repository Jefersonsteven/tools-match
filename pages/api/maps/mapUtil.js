import axios from "axios";

const getLinkMapByZipCode = async (zipCode, country) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const encodedCountry = country;
  const encodedZipCode = zipCode;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?components=country:"${encodedCountry}"|postal_code:"${encodedZipCode}"&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.results.length > 0) {
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
      return mapLink;
    } else {
      throw new Error(
        "No se encontraron resultados para el código postal y país especificados."
      );
    }
  } catch (error) {
    console.error("Error al obtener el enlace del mapa:", error.message);
    throw error;
  }
};

export default getLinkMapByZipCode;
