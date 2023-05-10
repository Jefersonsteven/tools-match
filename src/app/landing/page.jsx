
import style from './page.module.css';
import Image from 'next/image';


export default function LandingPage() {
    const teamMembers = [
        {
          name: 'Axel',
          image: '/public/images-landing/Axel.jpg',
        },
        {
            name: 'Celes',
            image: '/public/images-landing/Celeste.jpg',
        },
        {
            name: 'Ema',
            image: '/public/images-landing/Emanuel.jpg',
          },
          {
              name: 'Franco',
              image: '/public/images-landing/Franco.jpg',
          },
          {
            name: 'Adri',
            image: '/public/images-landing/Adriana.jpg',
          },
          {
              name: 'Jean',
              image: '/public/images-landing/Jean.jpg',
          },
          {
            name: 'Yael',
            image: '/public/images-landing/Yael.jpg',
          },
          {
              name: 'Jeffer',
              image: '/public/images-landing/Jeffer.jpg',
          },
      ];
    return (
        <div className={style.landingPageContainer}>
            <div className={style.nabvarContainer}>
                <Image  src="" alt="logo" className={style.nabvarLogo} />
                <nav className={style.nabvarLinks}>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
            </div>
            <section className={style.mainInfo}>
                <div className={style.mainInfoApp}>
                    <h1> ToolsMatch es una aplicación innovadora que se centra en satisfacer 
                         las necesidades de las comunidades en cuanto a la compra y el arriendo 
                         de herramientas. Ofrecemos una solución práctica para aquellos que buscan 
                         compartir recursos y ahorrar dinero en la compra de herramientas costosas.
                        Esto no solo ayuda a los vecinos a ahorrar dinero, sino que también fomenta 
                        una cultura de colaboración y compartición de recursos en la comunidad.
                        Si está buscando una forma práctica y segura de compartir herramientas con 
                        sus vecinos, ToolsMatch es una excelente opción.</h1>
                </div>
            </section>
            <section className={style.teamContainer}>
                <div className={style.infoTeam}>
                    <p className={style.teamTitle}>EQUIPO</p>
                    <p className={style.teamSubTitle}>Somos un equipo de colaboradores detrás de ToolsMatch demostrando un alto 
                    nivel de compromiso, pasión y profesionalismo en nuestro trabajo. Es inspirador 
                    ver cómo trabajamos juntos para lograr los objetivos y ofrecer un servicio 
                    excepcional a nuestros clientes. </p>
                </div>
                <div className={style.teamContact}>
                    {teamMembers.map(person => (
                    <div key={person.name} className={style.teamContactInfo}>
                        <Image 
                            src={person.image}
                            width={250} 
                            height={250} 
                            alt={person.name}
                            className={style.teamImage}
                        />
                        <h2 className={style.teamName}>{person.name}</h2>
                        <div className={style.teamLinks}>
                            <a href='https://github.com' target='_blanket'>
                            <Image className={style.github} src='/images-landing/github.png' alt='GitHub' width={35} height={40} />
                            </a>
                            <a href='https://linkedin.com' target='_blanket'>
                            <Image className={style.linkedin} src='/images-landing/linkedin.png' alt='LinkedIn'width={50} height={40} />
                            </a>
                        </div>
                    </div>
                    ))}
                </div>
                </section>
            <footer className={style.footer}>
                <div className={style.footerLogo}></div>
                <div className={style.footerRights}></div>
                <div className={style.footerTerms}></div>
            </footer>
        </div>
    )
}

