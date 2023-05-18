export default async function handler(req, res) {
  const { method } = req;
  const { email } = req.query;
  try {
    if (method == "PUT") {
      const findUser = await fetch(`/api/user/${email}`);
      const user = await findUser.json();
      if (user) {
        await fetch(`${URL_BASE}/api/admin/user/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ logged: false }),
        });
        res.status(200).json({ message: "Has cerrado sesión correctamente" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
