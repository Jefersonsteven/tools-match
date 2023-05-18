import customAlert from "./customAlert";
import { newPetition } from "./petition";
import Swal from "sweetalert2";

export const submitLogInFormData = async (
  loginData,
  setUserData,
  setUserId,
  rememberSession,
  router,
  saveInLocalStorage,
  form,
  setForm
) => {
  let dbUserData = null;
  const body = {
    email: loginData.email,
    password: loginData.password,
  };

  console.log(router);
  console.log(router.push);
  let responseOfValidation = await newPetition(
    "PUT",
    "/api/loginValidate",
    body
  );

  if (!responseOfValidation.error) {
    dbUserData = await newPetition(
      "GET",
      `/api/user/${loginData.email}`,
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
      setForm({ ...form, authorId: dbUserData.id });
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
    "/api/registerUser",
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
