"use client";

import style from "./Team.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Back from "@/components/back/Back";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";

export default function Team() {
  const router = useRouter();

  const team = [
    {
      name: "Axel",
      lastname: "Valiente",
      country: "Argentina",
      image: "Axel.png",
    },
    {
      name: "Celeste",
      lastname: "Flores",
      country: "Argentina",
      image: "Celeste.png",
    },
    {
      name: "Emmanuel",
      lastname: "Burgos",
      country: "Argentina",
      image: "Emmanuel.png",
    },
    {
      name: "Franco",
      lastname: "Itria",
      country: "Argentina",
      image: "Franco.png",
    },
    {
      name: "Adriana",
      lastname: "Sanchez",
      country: "Venezuela",
      image: "Adriana.png",
    },
    {
      name: "Jean",
      lastname: "Palomino",
      country: "Colombia",
      image: "Jean.png",
    },
    {
      name: "Yael",
      lastname: "Romero",
      country: "Mexico",
      image: "Yael.png",
    },
    {
      name: "Jefferson",
      lastname: "Nunez",
      country: "Colombia",
      image: "Jefferson.png",
    },
  ];

  return (
    <div>
      <div className={style.backcontainer}>
        <Back />
      </div>
      <div className={style.teamContainer}>
        <div className={style.infoTeam}>
          <p className={style.teamSubTitle}>
            Somos un equipo de colaboradores detrás de{" "}
            <span className={style.brand}>ToolsMatch</span> demostrando un alto
            nivel de compromiso, pasión y profesionalismo en nuestro trabajo. Es
            inspirador ver cómo trabajamos juntos para lograr los objetivos y
            ofrecer un servicio excepcional a nuestros clientes.
          </p>
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
              <h2 className={style.teamName}>
                Nombre:{" "}
                <span className={style.text}>
                  {person.name + " " + person.lastname}
                </span>
              </h2>
              <h2 className={style.teamName}>
                Lugar: <span className={style.text}>{person.country}</span>
              </h2>
              <div className={style.teamLinks}>
                <Link href="https://github.com" target="_blanket">
                  <FaGithub className={style.icons} />
                </Link>
                <Link href="https://linkedin.com" target="_blanket">
                  <FaLinkedin className={style.icons} />
                </Link>
                <Link href="https://www.gmail.com" target="_blanket">
                  <AiFillMail className={style.icons} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
