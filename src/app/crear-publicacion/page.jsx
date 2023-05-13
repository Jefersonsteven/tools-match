'use client'
import { useState } from "react";
import { DragAndDrop } from "@/components/DragAndDrop/DragAndDrop";
import styles from './CreatePost.module.css'
import { validatePost } from "./asset/validate";

function CreatePost() {

    const [type, setType] = useState('');

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        type: '',
        images: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        type: '',
        images: ''
    });

    function handleForm(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (typeof form[name] !== undefined) {
            validatePost({ ...form, [name]: value }, errors, setErrors)
            setForm({ ...form, [name]: value })
        }
    }
    // ! mandar la imagen sin code url
    return (
        <main className={styles.main}>
            <section>
                <button onClick={handleForm} name="type" value="LEASE">Arrendar</button>
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
                        <textarea onChange={handleForm} name="description" id="" cols="30" rows="5" value={form.description}></textarea>
                        <span>{errors.description}</span>
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
        </main>
    );
}

export default CreatePost;