
export default function registerUserEmail(emailUser, password){
    return  `
    <p>Estimado usuario, sus credenciales de acceso a ToolMatch son las siguientes: <br>
       Usuario: ${emailUser} <br>
       Contraseña: ${password} <br>
       Atentamente, el equipo de ToolMatch
    </p>
  `
}