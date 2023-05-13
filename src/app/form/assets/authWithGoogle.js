import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

const provider = new GoogleAuthProvider();

export const callLoginGoogle = (event, router, setUserSession) => {
  event.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const uid = user.uid;
      const providerData = user.providerData;

      console.log("Nombre completo:", displayName);
      console.log("Correo electrónico:", email);
      console.log("URL de la foto de perfil:", photoURL);
      console.log("UID del usuario:", uid);
      console.log("Datos del proveedor de identidad:", providerData);
      router.push("/home");
      setUserSession(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
