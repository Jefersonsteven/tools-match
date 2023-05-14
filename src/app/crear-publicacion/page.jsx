'use client'
import { useContext, useState } from "react";
import { DragAndDrop } from "@/components/DragAndDrop/DragAndDrop";
import styles from './CreatePost.module.css'
import { validatePost } from "./asset/validate";
import { AppContext } from "@/context/AppContext";
import { uploadImage } from "@/components/Cloudinary/upload";

function CreatePost() {
    const { form, setForm, errors, setErrors } = useContext(AppContext);
    const [urlsImages, setUrlsImages] = useState([]);

    function handleForm(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (typeof form[name] !== undefined) {
            validatePost({ ...form, [name]: value }, errors, setErrors)
            setForm({ ...form, [name]: value })
        }
    }

    function uploadImages(images, setUrlsImages) {
        const URLS = images.map(async (file) => await uploadImage(file));
        Promise.all(URLS).then(data => setUrlsImages(data));
    }

    async function handleSubmit() {
        const error = Object.values(errors).some(e => e.length > 0);
        const post = Object.values(form).some(e => e.length === 0);
        if (!error && !post) {
            if (form.photo.length > 0) uploadImages(form.photo, setUrlsImages)
            while (urlsImages.length < 0) {
                console.log('Subiendo Imagenes...');
            }
            const newPost = { ...form }
            newPost.photo = [...urlsImages];
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

    return (
        <main className={styles.main}>
            <section>
                <button onClick={handleForm} name="type" value="RENTAL">Arrendar</button>
                <button onClick={handleForm} name="type" value="SALE">Vender</button>
            </section>
            <section>
                <h2>Publica tu producto</h2>
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
                            <option value="herramienta-electrica">Herramienta Electrica</option>
                            <option value="herramienta-2">Herramienta 2</option>
                        </select>
                        <span>{errors.category}</span>
                    </div>
                </form>
            </section>
            <section>
                <DragAndDrop />
            </section>
            <button onClick={handleSubmit}>Publicar</button>
        </main>
    );
}

export default CreatePost;