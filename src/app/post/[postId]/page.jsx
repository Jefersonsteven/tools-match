'use client'
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./post.module.css";

function PostDetail({ }) {
    const { postId } = useParams();
    const { postDetail, setPostDetail, userId } = useContext(AppContext);
    const pd = postDetail;

    useEffect(() => {
        setPostDetail({
            id: 45712,
            title: 'taladro eléctrico de mano usado',
            price: 50,
            description: 'Este taladro eléctrico de mano es ideal para realizar trabajos de perforación en madera, metal, plástico y otros materiales. Ha sido previamente utilizado, pero se encuentra en buen estado y funciona correctamente. El taladro cuenta con una potencia de 500 vatios y una velocidad variable de hasta 3000 RPM. Además, incluye una broca para comenzar a trabajar de inmediato.',
            categories: ['herramientas', 'taladros, herramientas electricas'],
            author: {
                id: 1,
                username: 'juanperez88',
                rating: 1.0,
                image_perfil: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
            },
            images: [
                'https://us.123rf.com/450wm/godruma/godruma1802/godruma180200012/95380266-taladro-manual-o-m%C3%A1quina-de-perforaci%C3%B3n-equipada-con-un-accesorio-de-herramienta-de-corte-o-de.jpg',
                'https://us.123rf.com/450wm/vivacityimages/vivacityimages2004/vivacityimages200400051/144863343-vista-lateral-del-taladro-manual-a-bater%C3%ADa.jpg'
            ],
            type: 'SALE'
        })
    }, [setPostDetail])

    return (
        <main className={styles.main}>
            {postDetail.author !== undefined &&
                <>
                    <section className={styles.section_images}>
                        <figure className={styles.figure}>
                            <Image
                                className={styles.image_first}
                                src={pd?.images[0]}
                                width={442}
                                height={400}
                                alt={pd.title}
                                priority
                            />
                        </figure>
                        <div>
                            <figure className={styles.images}>
                                {pd.images.map((img, index) => (
                                    <Image
                                        className={styles.image_others}
                                        key={index}
                                        src={img}
                                        width={92}
                                        height={81}
                                        alt={pd.title}
                                    />
                                ))
                                }
                            </figure>
                        </div>
                    </section>
                    <section className={styles.section_description}>
                        <div className={styles.description_title}>
                            <h2>{pd.title}</h2>
                            <div>
                                {pd.type === 'SALE' && <h3>${pd.price}</h3>}
                                {pd.type === 'LEASE' && <h3>${pd.pricePerDay}</h3>}
                                { }
                            </div>
                        </div>
                        <p>{pd.description}</p>
                        <div className={styles.description_categories}>
                            <h5>Categorias:</h5>
                            <p>{pd.categories.join(', ')}</p>
                        </div>
                    </section>
                    <section className={styles.section_user}>
                        <div>
                            <figure>
                                <Image
                                    src={pd.images[0]}
                                    width={96}
                                    height={96}
                                    alt={pd.author.username}
                                />
                            </figure>
                            <div className={styles.user_info}>
                                <h5>@{pd.author.username}</h5>
                                <h5>⭐{pd.author.rating}.0</h5>
                            </div>
                        </div>
                    </section>
                    <section className={styles.section_button}>
                        {userId === pd.author.id && <button>Eliminar</button>}
                        {userId !== pd.author.id && pd.type === 'SALE' && <button>Comprar</button>}
                        {userId !== pd.author.id && pd.type === 'LEASE' && <button>Arrendar</button>}
                    </section>
                </>
            }
        </main>
    );
}

export default PostDetail;