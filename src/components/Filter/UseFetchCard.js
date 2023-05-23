export const fetchCards = async (selected, setCards) => {
  const getCategoryParam = () => selected.category ? `category=${selected.category}` : '';
  const getTypeParam = () => selected.type ? `type=${selected.type}` : '';
  const getBrandParam = () => selected.brand ? `brand=${selected.brand}` : '';

  const categoryParam = getCategoryParam();
  const typeParam = getTypeParam();
  const brandParam = getBrandParam();
  const orderParam = selected.order ? `order=${selected.order.order}&` : '';

  const response = await fetch(`/api/filters/allFilters?${categoryParam}&${typeParam}&${brandParam}`);
  const data = await response.json();
  let cards = data || [];

  if (selected.order?.type === 'price') {
    const orderResponse = await fetch(`/api/orderings/orderPrice?${orderParam}${typeParam}&${categoryParam}&${brandParam}`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }

  if (selected.order?.type === 'alpha') {
    const orderResponse = await fetch(`/api/orderings/orderAlphabetically?${orderParam}${typeParam}&${categoryParam}&${brandParam}`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }
  if (selected.order?.type === 'rating') {
    const orderResponse = await fetch(`/api/orderings/orderRating?${orderParam}${typeParam}&${categoryParam}&${brandParam}`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }
  if(selected.category=="" && selected.type=="" && selected.order.type=="" && selected.order.order=="" && selected.title =="" && selected.brand=="") {
    const orderResponse = await fetch(`/api/admin/post`);
    const orderData = await orderResponse.json();
    cards = orderData || [];
  }

  setCards(cards);
};
