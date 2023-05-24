export default function resetPassword() {
  return `
    <p style="color: black">
        Estimado usuario, useted solicito recuperar su contraseña, para realizar el cambio presiona el boton. 
    </p>
    <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black">
        <a href="https://tools-match-eight.vercel.app/home" style="text-decoration: none; color: black">
          Recuperar contraseña
        </a>   
    </button>
    <h4 style="color: black">
      Atentamente, el equipo de ToolMatch
    </h4>
  `;
}
