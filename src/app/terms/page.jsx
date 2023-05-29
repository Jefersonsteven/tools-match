"use client";

import style from "./Terms.module.css";
import React, { useState } from "react";
import Image from "next/image";
import Back from "@/components/back/Back";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Terms() {
  const router = useRouter();

  return (
    <div className={style.termsContainer}>
      <div className={style.backContainer}>
        <Back />
      </div>
      <div id="terms-and-conditions" className={style.terms}>
        <div className={style.termsHeader}>
          <h2 className={style.termsTitle}>
            <strong>
              <span className={style.brand}>ToolsMatch</span> - Términos y
              Condiciones
            </strong>
          </h2>
        </div>
        <h3>
          <strong>
            Bienvenido/a a <span className={style.brand}>ToolsMatch</span>, una
            plataforma en línea para la renta y venta de herramientas de
            construcción usadas. A continuación, te presentamos un resumen de
            nuestros términos y condiciones de uso:
          </strong>
        </h3>
        <div className={style.termsSubHeader}>
          <div>
            <strong>
              1- Servicios de <span className={style.brand}>ToolsMatch</span>
            </strong>
            <p>
              <span className={style.brand}>ToolsMatch</span> es una plataforma
              en línea diseñada para facilitar la renta y venta de herramientas
              de construcción usadas. Nuestros servicios se ofrecen
              exclusivamente en línea.
            </p>
          </div>
          <div>
            <strong>2- Registro y Cuenta</strong>
            <p>
              Para utilizar nuestros servicios, debes completar el formulario de
              registro con información precisa y actualizada. La cuenta es
              personal e intransferible, y eres responsable de mantener la
              confidencialidad de tu contraseña.
            </p>
          </div>
          <div>
            <strong>3- Uso Responsable</strong>
            <p>
              Nuestros servicios están disponibles para personas mayores de edad
              con capacidad legal para contratar. Si utilizas{" "}
              <span className={style.brand}>ToolsMatch</span> en nombre de una
              empresa, debes tener la capacidad para contratar en su nombre.
            </p>
          </div>
          <div>
            <strong>4- Privacidad de Datos</strong>
            <p>
              En <span className={style.brand}>ToolsMatch</span>, protegemos tu
              información personal y tomamos medidas para garantizar la
              seguridad de nuestros servicios. Puedes obtener más información
              sobre nuestra política de privacidad en nuestra Declaración de
              Privacidad.
            </p>
          </div>
          <div>
            <strong>5- Tarifas</strong>
            <p>
              <span className={style.brand}>ToolsMatch</span> se reserva el
              derecho de cobrar tarifas por el uso de nuestros servicios.
              Nuestros clientes se comprometen a pagar las tarifas
              correspondientes de manera oportuna. Las tarifas podrán ser
              modificadas con previo aviso.
            </p>
          </div>
          <div>
            <strong>5A-Tarifas</strong>
            <p>
              La Persona Usuaria autoriza a{" "}
              <span className={style.brand}>ToolsMatch</span> a retener y/o
              debitar los fondos existentes y/o futuros de su cuenta de Mercado
              Pago y/o de las cuentas bancarias que haya registrado en ella,
              para saldar las tarifas impagas o cualquier otra deuda que pudiera
              tener.
            </p>
          </div>
          <div>
            <strong>6- Propiedad Intelectual</strong>
            <p>
              Todos los derechos de propiedad intelectual relacionados con
              nuestra plataforma, contenido y servicios son propiedad de
              <span className={style.brand}>ToolsMatch</span>. Está prohibido
              utilizar nuestra propiedad intelectual sin autorización previa.
            </p>
          </div>
          <div>
            <strong>7- Responsabilidad</strong>
            <p>
              <span className={style.brand}>ToolsMatch</span> se responsabiliza
              por los defectos en la prestación de nuestros servicios, en la
              medida en que sean imputables a nosotros y de acuerdo con las
              leyes aplicables.
            </p>
          </div>
          <div>
            <strong>8- Sanciones</strong>
            <p>
              En caso de incumplimiento de los términos y condiciones, nos
              reservamos el derecho de tomar medidas, como advertencias,
              suspensiones o inhabilitaciones temporales o permanentes de la
              cuenta.
            </p>
          </div>
          <div>
            <strong>9- Indemnidad</strong>
            <p>
              Te comprometes a mantener indemne a{" "}
              <span className={style.brand}>ToolsMatch</span> y sus
              representantes ante cualquier reclamo derivado de tus actividades
              en nuestra plataforma.
            </p>
          </div>
          <div className={style.term10}>
            <strong>10- Jurisdicción y Ley Aplicable</strong>
            <p>
              Estos términos y condiciones se rigen por la ley vigente en tu
              jurisdicción. Cualquier controversia será resuelta por los
              tribunales competentes en dicha jurisdicción.
            </p>
          </div>
        </div>
        <div className={style.mptyc}>
          <strong>
            Además de estos Términos y Condiciones, Mercado Pago tiene sus
            propias reglas de uso:
          </strong>
          <p>Enlace a los Términos y Condiciones de Mercado Pago</p>
        </div>
        <div className={style.logoContainer}>
          <Link href="https://www.mercadolibre.cl/ayuda/299" target="blank">
            <Image
              src="/images/logo/mp.png"
              alt="logo"
              width={70}
              height={70}
              className={style.logo}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Terms;
