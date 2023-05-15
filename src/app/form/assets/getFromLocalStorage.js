export default function getFromLocalStorage() {
  if (localStorage.getItem("token") !== "") return JSON.parse(localStorage.getItem("token"));
  return false
}