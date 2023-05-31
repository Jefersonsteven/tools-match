export  function calcularPromedioDeRatings(reviews) {
  if (reviews.length === 0) {
    return 0;
  }

  const sumatoria = reviews.reduce((total, review) => total + review.rating, 0);
  const promedio = sumatoria / reviews.length;
  const promedioRound = promedio.toFixed(2);

  return promedioRound;
}