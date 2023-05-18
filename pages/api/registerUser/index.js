export default async function handler(req, res) {
  const { method } = req;
  const { firstname, lastname, email, password, phoneNumber } = req.body;
  const URL_BASE = process.env.DEPLOY_BACK || 'http://localhost:3000'
  if (method == "POST") {
    try {
      if (!firstname || !lastname || !email || !password || !phoneNumber) throw new Error("Faltan datos por completar");
      const response = await fetch(`${URL_BASE}/api/user/${email}`);
      const user = await response.json();
      if (user) throw new Error("Cuenta ya registrada con ese email");
      else {
        const response = await fetch(`${URL_BASE}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            phoneNumber,
          }),
        });
        const newUser = await response.json();
        res
          .status(200)
          .json({ message: "Usuario creado exitosamente", newUser });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
