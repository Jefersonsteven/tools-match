'use client'
import { useContext, useState } from "react";
import { DragAndDrop } from "@/components/DragAndDrop/DragAndDrop";
import * as style from './CreatePost.module.css'
import { validatePost } from "./asset/validate";
import { AppContext } from "@/context/AppContext";
import { uploadImage } from "@/components/Cloudinary/upload";

function CreatePost() {
    const { form, setForm, errors, setErrors, userId } = useContext(AppContext);
    const [urlsImages, setUrlsImages] = useState([]);

    function handleForm(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (typeof form[name] !== undefined) {
            validatePost({ ...form, [name]: value }, errors, setErrors)
            setForm({ ...form, [name]: value })
        }
    }

    async function uploadImages(images, setUrlsImages) {
        const URLS = images.map(async (file) => await uploadImage(file));
        const urls = await Promise.all(URLS)
        // .then(data => setUrlsImages(data));
        return urls
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const error = Object.values(errors).some(e => e.length > 0);
        const post = Object.values(form).some(e => e.length === 0);
        if (!error && !post) {
            if (form.photo.length > 0) {
                console.log('Hey!!☠️');
                const urls = await uploadImages(form.photo, setUrlsImages)

                const newPost = { ...form }
                newPost.photo = urls;
                newPost.price = Math.floor(newPost.price);

                const post = await fetch("http://localhost:3000/api/post", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPost)
                })
                const data = await post.json();

                setForm({
                    title: '',
                    content: '',
                    photo: [],
                    category: '',
                    price: '',
                    type: '',
                    authorId: userId
                })
            }   
        }
    }

    return (
        <main className={style.main}>
            <section className={style.buttons}>
                <button
                    className={form.type === 'RENTAL' ? style.active : style.desactived}
                    onClick={handleForm}
                    name="type"
                    value="RENTAL">
                    Arrendar
                </button>
                <button
                    className={form.type === 'SALE' ? style.active : style.desactived}
                    onClick={handleForm}
                    name="type"
                    value="SALE">
                    Vender
                </button>
                <span>{errors.type}</span>
            </section>
            <section className={style.form}>
                <h2>Publica una herramienta</h2>
                <form action="">
                    <div>
                        <label htmlFor="">Titulo</label>
                        <input onChange={handleForm} type="text" name="title" value={form.title} />
                        <span>{errors.title}</span>
                    </div>
                    <div>
                        <label htmlFor="">Descripción</label>
                        <textarea onChange={handleForm} name="content" id="" cols="30" rows="5" value={form.content}></textarea>
                        <span>{errors.content}</span>
                    </div>
                    <div>
                        <label htmlFor="">Precio</label>
                        <input onChange={handleForm} type="number" name="price" value={form.price} />
                        <span>{errors.price}</span>
                    </div>
                    <div>
                        <label htmlFor="">Categoria</label>
                        <select onChange={handleForm} name="category" id="" placeholder="categoria">
                            <option value="electrica">Herramienta Electrica</option>
                            <option value="manual">Herramienta Manual</option>
                            <option value="medicion">Herramienta de Medicion</option>
                            <option value="corte">Herramienta de Corte</option>
                            <option value="jardin">Herramienta de Jardin</option>
                            <option value="fontaneria">Herramienta de Fontaneria</option>
                            <option value="pintar">Herramienta para Pintar</option>
                            <option value="soldar">Herramienta de Soldar</option>
                        </select>
                        <span>{errors.category}</span>
                    </div>
                    <div className={style.button}>
                        <button onClick={handleSubmit}>Publicar</button>
                    </div>
                </form>
            </section>
            <section>
                <DragAndDrop />
            </section>
        </main>
    );
}

export default CreatePost;