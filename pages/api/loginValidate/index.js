const crypto = require("crypto");

export default async function handler(req, res) {
  const URL_BASE = "http://localhost:3000";
  const { method } = req;
  const { email } = req.body;
  let { password } = req.body;
  if (method == "PUT") {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      password = crypto.createHash("sha256").update(data).digest("hex");
      const response = await fetch(`${URL_BASE}/api/user/${email}`);
      const user = await response.json();
      if (user) {
        if (password == user.password) {
          if (!user.hidden) {
            const response = await fetch(
              `${URL_BASE}/api/admin/user/${user.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ logged: true }),
              }
            );
            const loggedUser = response.json();
            if (loggedUser)
              res.status(200).json({ Message: "Has iniciado sesión" });
          } else throw new Error("Te encuentras baneado de la aplicación");
        } else throw new Error("Contraseña incorrecta");
      } else throw new Error("Email incorrecto");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
