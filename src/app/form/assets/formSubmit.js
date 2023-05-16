import customAlert from "./customAlert";
import { newPetition } from "./petition";
import Swal from "sweetalert2";

export const submitLogInFormData = async (
  loginData,
  setUserData,
  setUserId,
  rememberSession,
  setRememberSession,
  router,
  saveInLocalStorage
) => {
  let dbUserData = null;
  const body = {
    email: loginData.email,
    password: loginData.password,
  };

  let responseOfValidation = await newPetition(
    "PUT",
    "http://localhost:3000/api/loginValidate",
    body
  );

  if (!responseOfValidation.error) {
    dbUserData = await newPetition(
      "GET",
      `http://localhost:3000/api/user/${loginData.email}`,
      false
    );
  } else {
    throw new Error(responseOfValidation.error);
  }

  if (dbUserData.logged) {
    setUserData(dbUserData);

    if (rememberSession) {
      saveInLocalStorage("token", dbUserData);
      saveInLocalStorage("id", dbUserData.id);
      setUserId(dbUserData.id);
    } else {
      setUserId(dbUserData.id);
    }
    customAlert(
      5000,
      "bottom-end",
      "success",
      `Has iniciado sesión como ${dbUserData.firstname} ${dbUserData.lastname}`
    );

    router.push("/home");
  }
};

export const submitSignUpFormData = async (registerData, router) => {
  const body = {
    firstname: registerData.name,
    lastname: registerData.surname,
    email: registerData.email,
    password: registerData.password,
    phoneNumber: registerData.phoneNumber,
  };

  let data = await newPetition(
    "POST",
    "http://localhost:3000/api/registerUser",
    body
  );

  if (data.newUser) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Tu cuenta ha sido creada, redirigiendo hacia el logIn",
      showConfirmButton: false,
      timer: 5000,
    });

    setTimeout(() => {
      router.push("/form/login");
    }, 3000);
  } else {
    throw new Error(data.error);
  }
};
