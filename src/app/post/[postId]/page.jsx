'use client'
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext } from "react";

function PostDetail({ }) {
    const { postId } = useParams();
    const { postDetail, setPostDetail, userId } = useContext(AppContext);
    const pd = postDetail;
    return (
        <main>
            <section>
                <figure>
                    <Image
                        src={pd.images[0]}
                        width={442}
                        height={400}
                        alt={pd.title}
                    />
                </figure>
                <div>
                    <figure>
                        {pd.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                width={92}
                                height={81}
                                alt={pd.title} />
                        ))
                        }
                    </figure>
                </div>
            </section>
            <section>
                <div>
                    <h2>{pd.title}</h2>
                    <div>
                        {<h3>${pd.price}</h3>}
                        {<h3>${pd.pricePerDay}</h3>}
                        { }
                    </div>
                </div>
                <p>{pd.desciption}</p>
                <div>
                    <h5>Categorias</h5>
                    <p>{pd.categories.join(', ')}</p>
                </div>
            </section>
            <section>
                <div>
                    <figure>
                        <Image
                            src={pd.images[0]}
                            width={51}
                            height={51}
                            alt={pd.author.username}
                        />
                    </figure>
                    <div>
                        <h5>{pd.author.username}</h5>
                        <h5>{pd.author.rating}.0</h5>
                    </div>
                </div>
            </section>
            <section>
                {userId === pd.author.id && <button>Eliminar</button>}
                {userId !== pd.author.id && pd.type === 'vender' && <button>Comprar</button>}
                {userId !== pd.author.id && pd.type === 'arrendar' && <button>Arrendar</button>}
            </section>
        </main>
    );
}

export default PostDetail;