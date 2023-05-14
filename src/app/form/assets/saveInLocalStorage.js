export default function saveInLocalStorage(title, data) {
  if (typeof Storage !== "undefined") {
    localStorage.setItem(title, JSON.stringify(data));
    return "datos guardados exitosamente";
  } else {
    console.log("LocalStorage no soportado en este navegador");
  }
}
