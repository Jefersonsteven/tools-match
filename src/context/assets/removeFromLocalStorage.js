export default function removeFromLocalStorage(key) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
  }
}
