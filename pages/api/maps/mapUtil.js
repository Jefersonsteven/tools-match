import axios from "axios";

const getStaticMapUrlByCoordinates = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=600x400&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=AIzaSyCUpL26pKZ0CSdNchdwEFr-qopnMtHvyvw`;

  try {
    const response = await axios.get(url);
    return response.config.url;
  } catch (error) {
    console.error("Error al obtener la URL del mapa estático:", error.message);
    throw error;
  }
};

export default getStaticMapUrlByCoordinates;
