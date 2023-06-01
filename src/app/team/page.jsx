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
      country: "argentina.png",
      image: "Axel.png",
      linkedin: "https://www.linkedin.com/in/axel-valiente-a312021b4/",
      github: "https://github.com/Yorozuya2001",
      mail: "axelvalientehex97@gmail.com",
    },
    {
      name: "Celeste",
      lastname: "Flores",
      country: "argentina.png",
      image: "Celeste.png",
      linkedin: "https://www.linkedin.com/in/mariacelesteflores",
      github: "https://github.com/CelesFlowers",
      mail: "seleccionfloresceleste@gmail.com",
    },
    {
      name: "Emanuel",
      lastname: "Burgos",
      country: "argentina.png",
      image: "Emmanuel.png",
      linkedin: "https://www.linkedin.com/in/emanuel-burgos-439537195/",
      github: "https://github.com/EmaBurgos",
      mail: "emaburgos17@hotmail.com",
    },
    {
      name: "Franco",
      lastname: "Itria",
      country: "argentina.png",
      image: "Franco2.jpg",
      linkedin: "https://www.linkedin.com/in/francoitria/",
      github: "https://github.com/fran-itria",
      mail: "francoitria01@gmail.com",
    },
    {
      name: "Adriana",
      lastname: "Sanchez",
      country: "venezuela.png",
      image: "Adriana.png",
      linkedin: "https://www.linkedin.com/in/adriana-sanchez-mejias/",
      github: "https://github.com/Adri-ESM",
      mail: "anggivmorales@gmail.com",
    },
    {
      name: "Jean",
      lastname: "Palomino",
      country: "colombia.png",
      image: "Jean.png",
      linkedin: "https://www.linkedin.com/in/jean-heyller-palomino-1139381a6/",
      github: "https://github.com/jean-heyller",
      mail: "heyller-19@outlook.com",
    },
    {
      name: "Yael",
      lastname: "Romero",
      country: "mexico.png",
      image: "Yael.png",
      linkedin: "https://www.linkedin.com/in/yael-romero-528654148",
      github: "https://github.com/Rai5559",
      mail: "yaelromero281@gmail.com",
    },
    {
      name: "Jefferson",
      lastname: "Nuñez",
      country: "colombia.png",
      image: "Jefferson.png",
      linkedin: "https://www.linkedin.com/in/jeffersonsteven/",
      github: "https://github.com/Jefersonsteven",
      mail: "dev@jeffersonsteven.com",
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
                <span className={style.text}>
                  {person.name + " " + person.lastname}
                </span>
              </h2>
              <h6>{"Full Stack Developer"}</h6>
              <h2 className={style.teamName}>
                <Image
                  src={`/images/icons/${person.country}`}
                  className={style.countryicon}
                  width={30}
                  height={30}
                />
              </h2>
              <div className={style.teamLinks}>
                <Link href={person.github} target="_blanket">
                  <FaGithub className={style.icons} />
                </Link>
                <Link href={person.linkedin} target="_blanket">
                  <FaLinkedin className={style.icons} />
                </Link>
                <Link href={`mailto:${person.mail}`}>
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
