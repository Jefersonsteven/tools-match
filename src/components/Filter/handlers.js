export const handleTitleChange = (newTitle, setTitle, setSelected,selected) => {
  setTitle(newTitle);
  if (newTitle.length === 0) {
    setSelected({ ...selected, title: "" });
  }
};

export const handleTitleButtonChange = async (title, setCards,setSelected,selected,userId) => {
  setSelected({ ...selected, title: title });
/*   const response = await fetch(`/api/filters/title?id=${userId}&name=${title}`);
  const data = await response.json();
  setCards(data || []); */
};
export const handleCategoryChange = (event, setSelected, setCategoryFilter) => {
  const categoryValue = event.target.value;
  setSelected((prevSelected) => ({
    ...prevSelected,
    category: categoryValue,
  }));
  setCategoryFilter(categoryValue);
};

export const handleTypeChange = (event, setSelected, setTypeFilter) => {
  const typeValue = event.target.value;
  setSelected((prevSelected) => ({
    ...prevSelected,
    type: typeValue,
  }));
  setTypeFilter(typeValue);
};

export const handleCountryChange = (event, setSelected, setCountryFilter) => {
  const countryValue = event.target.value;
  setSelected((prevSelected) => ({
    ...prevSelected,
    country: countryValue,
  }));
  setCountryFilter(countryValue)
};

export const handleBrandChange = (event, setSelected, setBrandFilter) => {
  const brandValue = event.target.value;
  setSelected((prevSelected) => ({
    ...prevSelected,
    brand: brandValue,
  }));
  setBrandFilter(brandValue);
};

export const handleOrderChange = (type, order, setSelected, setOrderFilter) => {
  setSelected((prevSelected) => ({
    ...prevSelected,
    order: { type, order },
  }));
  setOrderFilter(`${type}-${order}`);
};

// filtrar por handle Km - Jeffer
export const handleKmChange = (setSelected, km, coorde1, coorde2, range) => {
  if (km == "0") {
    setSelected((prevSelected) => ({
      ...prevSelected,
      coorde1: "",
      coorde2: "",
      km: "",
    }));
  } else {
    setSelected((prevSelected) => ({
      ...prevSelected,
      coorde1,
      coorde2,
      km,
    }));
  }
  console.log(km)
};

export const handleClearFilters = (
  setSelected,
  setCategoryFilter,
  setTypeFilter,
  setBrandFilter,
  setOrderFilter,
  setCountryFilter,
) => {
  const event = { target: { value: "" } };
  handleCategoryChange(event, setSelected, setCategoryFilter);
  handleTypeChange(event, setSelected, setTypeFilter);
  handleBrandChange(event,setSelected,setBrandFilter)
  handleOrderChange("","",setSelected,setOrderFilter);
  handleKmChange(setSelected, "", "", "");
  handleCountryChange(event,setSelected, setCountryFilter);
};

