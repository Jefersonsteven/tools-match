import style from "./modal.module.css";

const Modal = ({ onClose }) => {
  return (
    <div className={style.modalContainer}>
      <div className={style.modal}>
        <h2 className={style.modalTitle}>Términos y condiciones</h2>
        <p>Al utilizar la aplicación ToolsMatch, aceptas los siguientes términos y condiciones: 

          <br/>

            <b>1-</b> Acceso y uso de la aplicación
            El acceso y uso de la aplicación está sujeto a los términos y condiciones descritos en este documento. 
            Al acceder y utilizar la aplicación, aceptas estos términos y condiciones en su totalidad. Si no estás 
            de acuerdo con alguno de estos términos y condiciones, no utilices la aplicación.
            <br/>
            <b>2-</b> Responsabilidades del usuario
            Eres responsable de cualquier actividad que se realice a través de tu cuenta en la aplicación. 
            Debes mantener tu cuenta segura y protegida mediante una contraseña fuerte y nunca compartirla 
            con terceros. Además, eres responsable de garantizar que toda la información que proporciones a la 
            aplicación sea precisa y actualizada.
            <br/>
            <b>3-</b> Propiedad intelectual
            La aplicación y todo su contenido, incluyendo pero no limitado a su diseño, texto, gráficos, imágenes, 
            software, código fuente y cualquier otro material, son propiedad de ToolsMatch y están protegidos por 
            las leyes de propiedad intelectual. No se permite la reproducción, modificación, distribución o uso 
            comercial de ningún contenido sin el permiso previo por escrito de ToolsMatch.
            <br/>
            <b>4-</b> Política de privacidad
            La privacidad de los usuarios es importante para nosotros. Para conocer nuestra política de privacidad, 
            visita el siguiente enlace: [enlace a la política de privacidad].
            <br/>
            <b>5-</b> Limitación de responsabilidad
            La aplicación se proporciona tal cual, sin garantías de ningún tipo, expresas o implícitas. ToolsMatch 
            no garantiza la precisión, integridad, idoneidad o disponibilidad de la aplicación y no será responsable 
            por cualquier pérdida o daño que resulte del uso de la aplicación.
            <br/>
            <b>6-</b> Modificación de los términos y condiciones
            ToolsMatch se reserva el derecho de modificar estos términos y condiciones en cualquier momento y sin 
            previo aviso. Se recomienda que revises periódicamente estos términos y condiciones para estar al tanto 
            de cualquier cambio.
            <br/>
            <b>7-</b> Ley aplicable
            Estos términos y condiciones se rigen por las leyes del país de origen de ToolsMatch. Cualquier disputa 
            relacionada con estos términos y condiciones será sometida a los tribunales competentes de dicho país.
           </p>
        <button className={style.modalButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;