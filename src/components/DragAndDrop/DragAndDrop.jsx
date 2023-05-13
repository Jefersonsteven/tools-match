import React, { useContext, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from './DragAndDrop.module.css';
import Image from 'next/image';
import { AppContext } from '@/context/AppContext';
import { validatePost } from '@/app/crear-publicacion/asset/validate';

export const DragAndDrop = () => {
    const { imageUrls, setImageUrls, errors, setErrors, form } = useContext(AppContext);
    const [imagesView, setImagesView] = useState([]);

    const handleDelete = (index) => {
        const newImageView = [...imagesView];
        const newImageUrl = [...imagesView];
        newImageView.splice(index, 1);
        newImageUrl.splice(index, 1);
        setImagesView(newImageView);
        setImageUrls(newImageUrl);
        validatePost({ ...form, images: [...newImageUrl] }, errors, setErrors)
    };

    return (
        <div className={styles.container}>
            <h2>Arrastra y suelta tus imágenes aquí</h2>
            {<Dropzone
                onDrop={acceptedFiles => {
                    const newImageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
                    setImageUrls([...imageUrls, ...acceptedFiles]);
                    validatePost({ ...form, images: [...imageUrls, ...acceptedFiles] }, errors, setErrors);
                    setImagesView([...imagesView, ...newImageUrls]);
                }}>
                {({ getRootProps, getInputProps }) => (
                    <section className={styles.section}>
                        {imageUrls.length < 4 ? <div {...getRootProps()}>
                            <input
                                accept={"image/*"}
                                {...getInputProps()} />
                            <p>Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</p>
                        </div> : <p>Maximo 4 Imagenes</p>}
                    </section>
                )}
            </Dropzone>}
            <div className={styles.images}>
                {imagesView.map((imageUrl, index) => (
                    <div key={index}>
                        <Image src={imageUrl} width={100} height={100} alt='img' />
                        <button onClick={() => handleDelete(index)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <span>{errors.images}</span>
        </div>
    );
}