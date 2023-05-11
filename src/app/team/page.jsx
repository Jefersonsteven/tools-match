import style from "./Team.module.css";
import Image from "next/image";

export default function Team() {
  const team = [
    {
      name: "Axel",
      image: "Axel.jpg",
    },
    {
      name: "Celes",
      image: "Celeste.jpg",
    },
    {
      name: "Ema",
      image: "Emanuel.jpg",
    },
    {
      name: "Franco",
      image: "Franco.jpg",
    },
    {
      name: "Adri",
      image: "Adriana.jpg",
    },
    {
      name: "Jean",
      image: "Jean.jpg",
    },
    {
      name: "Yael",
      image: "Yael.jpg",
    },
    {
      name: "Jeffer",
      image: "Jeffer.jpg",
    },
  ];

  return (
    <div>
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
                src={`/../public/images/team/${person.image}`}
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
                    src="/../public/images/icons/github.jpg"
                    alt="GitHub"
                    width={35}
                    height={40}
                  />
                </a>
                <a href="https://linkedin.com" target="_blanket">
                  <Image
                    className={style.linkedin}
                    src="/../public/images/icons/linkedin.jpg"
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