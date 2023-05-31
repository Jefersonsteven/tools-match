import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import Swal from "sweetalert2";
import { newPetition } from "./petition";
import generatePassword from "./passwordGenerator";
import customAlert from "./customAlert";
import saveInLocalStorage from "@/context/assets/saveInLocalStorage";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const callLoginGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        let displayNameSplit = user.displayName.split(" ");

        resolve({
          firstname: displayNameSplit[0],
          lastname: displayNameSplit.slice(1).join(" "),
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          logged: true,
          token,
        });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getDataFromDB = async (
  userDataProvider,
  setUserData,
  setUserId,
  router
) => {
  let dbUserData = null;

  dbUserData = await newPetition(
    "GET",
    `/api/user/${userDataProvider.email}`,
    false
  );

  if (dbUserData.hidden) {
    Swal.fire({
      position: "center",
      title: `Su cuenta se encuentra baneada.`,
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }

  if (!dbUserData || dbUserData.error) {
    Swal.fire({
      position: "center",
      title: `Parece que tu cuenta no esta en toolmatch registrate con Google o completa el formulario`,
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      router.push("/form/logout");
    }, 3000);
  } else {
    const loginTime = new Date().getTime();

    saveInLocalStorage("token", dbUserData);
    saveInLocalStorage("id", dbUserData.id);
    saveInLocalStorage("loginTime", loginTime);
    setUserData(dbUserData);
    setUserId(dbUserData.id);

    router.push("/home");
    customAlert(
      5000,
      "bottom-end",
      "success",
      `Has iniciado sesión como ${dbUserData.firstname} ${dbUserData.lastname}`
    );
  }
};

export const createNewUserOrLogIn = async (
  userDataProvider,
  setUserData,
  setUserId,
  router,
  setDataMessage
) => {
  let dbUserData = null;
  let password = generatePassword();

  setDataMessage("Iniciando sesión...");

  const body = {
    ...userDataProvider,
    password,
  };
  dbUserData = await newPetition(
    "GET",
    `/api/user/${userDataProvider.email}`,
    false
  );

  if (dbUserData.hidden) {
    Swal.fire({
      position: "center",
      title: `Su cuenta se encuentra baneada.`,
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }

  if (!dbUserData || dbUserData.error) {
    /* Crear nuevo usuario con google */
    setDataMessage("Creando cuenta en toolmatch...");

    await newPetition("POST", "/api/user", body);
    dbUserData = await newPetition(
      "GET",
      `/api/user/${userDataProvider.email}`,
      false
    );
    setDataMessage("Enviando Credencial de acceso...");
    await newPetition("POST", "/api/sendEmail/registerGoogle", {
      email: userDataProvider.email,
      password,
    });
  }

  if (!dbUserData || dbUserData.error) {
    throw new Error("Error al crear cuenta");
  }

  const loginTime = new Date().getTime();
  saveInLocalStorage("token", dbUserData);
  saveInLocalStorage("id", dbUserData.id);
  saveInLocalStorage("loginTime", loginTime);
  setUserData(dbUserData);
  setUserId(dbUserData.id);

  router.push("/home");

  customAlert(
    5000,
    "bottom-end",
    "success",
    `Has iniciado sesión como ${dbUserData.firstname} ${dbUserData.lastname}`
  );
};
