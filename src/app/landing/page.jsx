
import style from './page.module.css';


export default function LandingPage() {
    return (
        <div className={style.landingPageContainer}>
            <div className={style.nabvarContainer}>
                <img className={style.nabvarLogo} src="" alt="logo" />
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
            <section className={style.mainTeam}>
                <div className={style.mainInfoTeam}>
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

