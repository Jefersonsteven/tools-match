export  function calcularPromedioDeRatings(reviews) {
  if (reviews.length === 0) {
    return 0;
  }

  const sumatoria = reviews.reduce((total, review) => total + review.rating, 0);
  const promedio = sumatoria / reviews.length;

  return promedio;
}