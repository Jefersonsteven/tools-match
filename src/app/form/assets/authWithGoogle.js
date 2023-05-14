import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

const provider = new GoogleAuthProvider();

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
