"use client";

import style from "./Team.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCaretBack } from "react-icons/io5";

export default function Team() {
  const router = useRouter();

  const team = [
    {
      name: "Axel",
      image: "Axel.png",
    },
    {
      name: "Celeste",
      image: "Celeste.png",
    },
    {
      name: "Emmanuel",
      image: "Emmanuel.png",
    },
    {
      name: "Franco",
      image: "Franco.png",
    },
    {
      name: "Adriana",
      image: "Adriana.png",
    },
    {
      name: "Jean",
      image: "Jean.png",
    },
    {
      name: "Yael",
      image: "Yael.png",
    },
    {
      name: "Jefferson",
      image: "Jefferson.png",
    },
  ];

  function handleBack() {
    router.back();
  }

  return (
    <div>
      <div onClick={handleBack} className={style.backContainer}>
        <div className={style.back}>
          <IoCaretBack size={50} color="var(--white)" />
        </div>
        <h3>Volver</h3>
      </div>
      <section className={style.teamContainer}>
        <div className={style.infoTeam}>
          <p className={style.teamSubTitle}>
            Somos un equipo de colaboradores detrás de ToolsMatch demostrando un
            alto nivel de compromiso, pasión y profesionalismo en nuestro
            trabajo. Es inspirador ver cómo trabajamos juntos para lograr los
            objetivos y ofrecer un servicio excepcional a nuestros clientes.{" "}
          </p>
          <p className={style.teamTitle}>EQUIPO</p>
        </div>
        <div className={style.teamContact}>
          {team.map((person) => (
            <div key={person.name} className={style.teamContactInfo}>
              <Image
                src={`/images/team/${person.image}`}
                width={250}
                height={250}
                alt={person.name}
                className={style.teamImage}
              />
              <h2 className={style.teamName}>{person.name}</h2>
              <div className={style.teamLinks}>
                <a href="https://github.com" target="_blanket">
                  <Image
                    className={style.github}
                    src="/images/icons/github.jpg"
                    alt="GitHub"
                    width={35}
                    height={40}
                  />
                </a>
                <a href="https://linkedin.com" target="_blanket">
                  <Image
                    className={style.linkedin}
                    src="/images/icons/linkedin.jpg"
                    alt="LinkedIn"
                    width={50}
                    height={40}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
