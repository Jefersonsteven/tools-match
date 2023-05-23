export const newPetition = async (method, url, dataToSend) => {
  try {
    let config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (dataToSend) {
      config = { ...config, body: JSON.stringify(dataToSend) };
    }

    let response = await fetch(url, config);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("in petition: ", error);
  }
};
