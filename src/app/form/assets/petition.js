const newPetition = (method, url, data) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log("Entrando en try catch");
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    };
    let response = await fetch(
      `http://localhost:3000/api/loginValidate`,
      config
    );
    response = await response.json();

    console.log(response);

    if (response.Message === "Has iniciado sesión") {
      router.push("/home");
      setUserSession(true);
    }
  } catch (error) {
    console.error("Error en la solicitud ", error);
  }
};
