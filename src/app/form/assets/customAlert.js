import Swal from "sweetalert2";

export default function customAlert(timer, position, icon, title) {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
      toast.style.fontSize = "16px";
    },
  });

  Toast.fire({
    icon,
    title,
  });
}
