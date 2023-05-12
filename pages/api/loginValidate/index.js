const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// let { claves } = require("../../../simDB/simDB");

export default async function handler(req, res) {
  const URL_BASE = "http://localhost:3000";
  const { method } = req;
  const { email, password } = req.query;
  if (method == "GET") {
    try {
      const response = await fetch(`${URL_BASE}/api/user/${email}`);
      const user = await response.json();
      if (user) {
        /* console.log(`Claves del usuario ${email}`);
        console.log(claves);
        console.log(claves[email]);
        const decipher = crypto.createDecipheriv(
          "aes-256-cbc",
          Buffer.from(claves[email].secretKey, "hex"),
          Buffer.from(claves[email].iv, "hex")
        );
        let passwordCheck = decipher.update(user.password, "hex", "utf8");
        passwordCheck += decipher.final("utf8");
        METODO PARA DECICRIPTAR LA PASSWORD DEL USUARIO EN LA BASE DE DATOS 
        */
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
