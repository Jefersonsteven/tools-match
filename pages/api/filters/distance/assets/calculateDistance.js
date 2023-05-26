export function calcularDistancia(latitud1, longitud1, latitud2, longitud2) {
  const radioTierra = 6371; // Radio de la Tierra en kilómetros

  // Convertir las coordenadas a radianes
  const latitud1Rad = toRadian(latitud1);
  const longitud1Rad = toRadian(longitud1);
  const latitud2Rad = toRadian(latitud2);
  const longitud2Rad = toRadian(longitud2);

  // Calcular la diferencia entre las coordenadas
  const deltaLatitud = latitud2Rad - latitud1Rad;
  const deltaLongitud = longitud2Rad - longitud1Rad;

  // Aplicar la fórmula de Haversine
  const a =
    Math.sin(deltaLatitud / 2) ** 2 +
    Math.cos(latitud1Rad) *
      Math.cos(latitud2Rad) *
      Math.sin(deltaLongitud / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = radioTierra * c;

  // Redondear la distancia a dos decimales
  const distanciaRedondeada = Math.round(distancia * 100) / 100;

  return distanciaRedondeada;
}

function toRadian(grados) {
  return grados * (Math.PI / 180);
}

// Ejemplo de uso
/* const latitud1 = 4.6517845;
const longitud1 = -74.1417302;

const latitud2 = 4.6517845;
const longitud2 = -74.1417302;

const distancia = calcularDistancia(latitud1, longitud1, latitud2, longitud2);
console.log('La distancia entre las ubicaciones es: ' + distancia + ' km'); */