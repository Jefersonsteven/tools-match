"use client";

import style from "./Terms.module.css";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";

function Terms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [showQuestion, setShowQuestion] = useState(true);

  const handleButtonClick = async (message) => {
    setShowMessage(true);
    setMessageText(message);
    setShowButtons(false);
    setShowQuestion(false);
  };

  return (
    <div className={style.termsContainer}>
      <div id="terms-and-conditions" className={style.terms}>
        <div className={style.termsHeader}>
          <h2 className={style.termsTitle}>
            <strong>ToolsMatch - Términos y Condiciones</strong>
          </h2>
        </div>
        <div className={style.termsSubHeader}>
          <p className={style.termsSubTitle}>
            Bienvenido/a a ToolsMatch, una plataforma en línea para la renta y
            venta de herramientas de construcción usadas. A continuación, te
            presentamos un resumen de nuestros términos y condiciones de uso:
            <br />
            <br />
            <strong>1- Servicios de ToolsMatch:</strong>
            <br />
            <br />
            ToolsMatch es una plataforma en línea diseñada para facilitar la
            renta y venta de herramientas de construcción usadas. Nuestros
            servicios se ofrecen exclusivamente en línea.
            <br />
            <br />
            <strong>2- Registro y Cuenta:</strong>
            <br />
            <br />
            Para utilizar nuestros servicios, debes completar el formulario de
            registro con información precisa y actualizada. La cuenta es
            personal e intransferible, y eres responsable de mantener la
            confidencialidad de tu contraseña.
            <br />
            <br />
            <strong>3- Uso Responsable:</strong>
            <br />
            <br />
            Nuestros servicios están disponibles para personas mayores de edad
            con capacidad legal para contratar. Si utilizas ToolsMatch en nombre
            de una empresa, debes tener la capacidad para contratar en su
            nombre.
            <br />
            <br />
            <strong>4- Privacidad de Datos:</strong>
            <br />
            <br />
            En ToolsMatch, protegemos tu información personal y tomamos medidas
            para garantizar la seguridad de nuestros servicios. Puedes obtener
            más información sobre nuestra política de privacidad en nuestra
            Declaración de Privacidad.
            <br />
            <br />
            <strong>5- Tarifas:</strong>
            <br />
            <br />
            ToolsMatch se reserva el derecho de cobrar tarifas por el uso de
            nuestros servicios. Nuestros clientes se comprometen a pagar las
            tarifas correspondientes de manera oportuna. Las tarifas podrán ser
            modificadas con previo aviso.
            <br />
            La Persona Usuaria autoriza a ToolsMatch a retener y/o debitar los
            fondos existentes y/o futuros de su cuenta de Mercado Pago y/o de
            las cuentas bancarias que haya registrado en ella, para saldar las
            tarifas impagas o cualquier otra deuda que pudiera tener.
            <br />
            <br />
            <strong>6- Propiedad Intelectual:</strong>
            <br />
            <br />
            Todos los derechos de propiedad intelectual relacionados con nuestra
            plataforma, contenido y servicios son propiedad de ToolsMatch. Está
            prohibido utilizar nuestra propiedad intelectual sin autorización
            previa.
            <br />
            <br />
            <strong>7- Responsabilidad:</strong>
            <br />
            <br />
            ToolsMatch se responsabiliza por los defectos en la prestación de
            nuestros servicios, en la medida en que sean imputables a nosotros y
            de acuerdo con las leyes aplicables.
            <br />
            <br />
            <strong>8- Sanciones:</strong>
            <br />
            <br />
            En caso de incumplimiento de los términos y condiciones, nos
            reservamos el derecho de tomar medidas, como advertencias,
            suspensiones o inhabilitaciones temporales o permanentes de la
            cuenta.
            <br />
            <br />
            <strong>9- Indemnidad:</strong>
            <br />
            <br />
            Te comprometes a mantener indemne a ToolsMatch y sus representantes
            ante cualquier reclamo derivado de tus actividades en nuestra
            plataforma.
            <br />
            <br />
            <strong>10- Jurisdicción y Ley Aplicable:</strong>
            <br />
            <br />
            Estos términos y condiciones se rigen por la ley vigente en tu
            jurisdicción. Cualquier controversia será resuelta por los
            tribunales competentes en dicha jurisdicción. 11- Anexos:
            <br />
            <br />
            <strong>
              11- Además de estos Términos y Condiciones, Mercado Pago tiene sus
              propias reglas de uso:
            </strong>
            <br />
            <br />
            Enlace a los Términos y Condiciones de Mercado Pago
            <a href="https://www.mercadolibre.cl/ayuda/299" target="blank">
              <Image
                src="/images/logo/mp.png"
                alt="logo"
                width={70}
                height={70}
                className={style.logo}
              />
            </a>
          </p>
        </div>
        <div className={style.infoUtil}>
          {!showMessage && (
            <div>
              <p>¿Te fue útil la información?</p>
            </div>
          )}
          {showButtons && (
            <div className={style.termButton}>
              <button
                onClick={() =>
                  handleButtonClick(
                    <span>
                      ¡Muchas Gracias! Tu opinión ayuda a mejorar esta
                      información para todas las personas.
                    </span>
                  )
                }
              >
                Sí
              </button>
              <button
                onClick={() =>
                  handleButtonClick(
                    "Lamentamos que no te haya sido útil. Agradecemos tu feedback para mejorar."
                  )
                }
              >
                No
              </button>
            </div>
          )}

          {showMessage && (
            <div className={style.message}>
              <p>{messageText}</p>
              <button
                onClick={() => {
                  setShowMessage(false);
                  setShowButtons(true);
                }}
                className={style.Close}
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Terms;

{
  /* HACER EL ROUTER BACK */
}
