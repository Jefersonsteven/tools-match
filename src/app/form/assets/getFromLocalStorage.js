export default function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("token"));
}