import Swal from "sweetalert2";

const checkSessionExpiration = () => {
  console.log("función");
  const loginTime = localStorage.getItem("loginTime");
  if (loginTime) {
    const currentTime = new Date().getTime();
    const expirationTime = 30 * 1000;
    if (currentTime - loginTime > expirationTime) {
      localStorage.removeItem("loginTime");
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      Swal.fire("Sesión expirada. Por favor, inicia sesión nuevamente").then(
        () => {
          window.location.reload();
        }
      );
    }
  }
};

export default checkSessionExpiration;
