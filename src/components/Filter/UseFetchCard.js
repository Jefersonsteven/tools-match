export const fetchCards = async (selected, setCards, title, userId, setIsLoading,setCurrentPage) => {
  setIsLoading(true); // Establecer isLoading en true
  setCurrentPage(1);

  const getCategoryParam = () => selected.category ? `category=${selected.category}` : '';
  const getTypeParam = () => selected.type ? `type=${selected.type}` : '';
  const getBrandParam = () => selected.brand ? `brand=${selected.brand}` : '';
  const getTitleParam = () => selected.title ? `title=${selected.title}` : '';
  const getKmParam = () => selected.km !==0 ? `km=${selected.km}` : '';
  const getCoorde1Param = () => selected.coorde1 &&  selected.km !==0 ? `coorde1=${selected.coorde1}` : '';
  const getCoorde2Param = () => selected.coorde2 &&  selected.km !==0 ? `coorde2=${selected.coorde2}` : '';
  const getCountryParam = () => selected.country ? `country=${selected.country}` : '';
  const getUserIdParam = () => userId ? `id=${userId}` : '';

  const categoryParam = getCategoryParam();
  const typeParam = getTypeParam();
  const brandParam = getBrandParam();
  const titleParam = getTitleParam();
  const orderParam = selected.order ? `order=${selected.order.order}&` : '';
  const IdParam = getUserIdParam();

  // Filtrar por distancia - Jeffer
  const kmParam = getKmParam();
  const coorde1Param = getCoorde1Param();
  const coorde2Param = getCoorde2Param();

  // Filtrar por país
  const countryParam = getCountryParam();

  setCards([]); // Limpiar el estado cards

  const response = await fetch(`/api/filters/allFilters?${categoryParam}&${typeParam}&${brandParam}&${titleParam}&${kmParam}&${coorde1Param}&${coorde2Param}&${countryParam}&${IdParam}`);
  const data = await response.json();
  let cards = data || [];

  if (selected.order?.type === 'price') {
    const orderResponse = await fetch(`/api/orderings/orderPrice?${orderParam}${typeParam}&${categoryParam}&${brandParam}&${titleParam}&${kmParam}&${coorde1Param}&${coorde2Param}&${countryParam}&${IdParam}`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }

  if (selected.order?.type === 'alpha') {
    const orderResponse = await fetch(`/api/orderings/orderAlphabetically?${orderParam}${typeParam}&${categoryParam}&${brandParam}&${titleParam}&${kmParam}&${coorde1Param}&${coorde2Param}&${countryParam}&${IdParam}`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }

  if (selected.order?.type === 'rating') {
    const orderResponse = await fetch(`/api/orderings/orderRating?${orderParam}${typeParam}&${categoryParam}&${brandParam}&${titleParam}&${kmParam}&${coorde1Param}&${coorde2Param}&${countryParam}&${IdParam}`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }

  if (
    selected.category === "" &&
    selected.type === "" &&
    selected.order.type === "" &&
    selected.order.order === "" &&
    selected.title === "" &&
    selected.brand === "" &&
    selected.km === "" &&
    selected.country === ""
  ) {
    const orderResponse = userId ? await fetch(`/api/admin/postByCountry/${userId}`) : await fetch(`/api/admin/post`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }

  setIsLoading(false); // Establecer isLoading en false
  setCards(cards);
};
