export default function endSession(email) {
  console.log("Cerrando Sesión");
  fetch(`http://localhost:3000/api/logoutUser/${email}`, {
    method: "PUT",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
