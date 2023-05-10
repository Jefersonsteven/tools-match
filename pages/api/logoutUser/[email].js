
export default async function handler(req, res){
    const URL_BASE = "http://localhost:3000";
    const { method } = req
    const { email } = req.query
    try {
        if(method == 'PUT'){
            const response = await fetch(`${URL_BASE}/api/user/${email}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({logged: false})
            })
            const user = await response.json()
            res.status(200).json({message: 'Has cerrado sesión correctamente', user})
        }
    } catch (error) {
        res.status(400).json(error)
    }
}