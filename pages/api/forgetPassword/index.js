export default async function handler(req, res) {
    const { method } = req;
    const { email, newPassword } = req.body;
    const URL_BASE = process.env.DEPLOY_BACK || 'http://localhost:3000'
    if (method == "PUT") {
      try {
        const response = await fetch(`${URL_BASE}/api/user/${email}`);
        const user = await response.json();
        if (user){
            const response = await fetch(`${URL_BASE}/api/user/${email}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password: newPassword})
            })
            const restauringPassword = await response.json()
            res.status(200).json({message: 'Contraseña actualizada', newPassword, restauringPassword})
        } else throw new Error('Usuario no encontrado')
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  }