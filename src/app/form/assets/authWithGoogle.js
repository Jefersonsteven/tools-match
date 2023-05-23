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
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
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

  if (!dbUserData) {
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

  console.log(setDataMessage);
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

  if (!dbUserData) {
    setDataMessage("Creando cuenta en toolmatch...");
    await newPetition("POST", "http://localhost:3000/api/user", body);
    dbUserData = await newPetition(
      "GET",
      `/api/user/${userDataProvider.email}`,
      false
    );
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
