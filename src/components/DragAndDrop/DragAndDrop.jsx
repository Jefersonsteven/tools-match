import React, { useContext } from 'react';
import Dropzone from 'react-dropzone';
import styles from './DragAndDrop.module.css';
import Image from 'next/image';
import { AppContext } from '@/context/AppContext';

export const DragAndDrop = () => {
    const { imageUrls, setImageUrls } = useContext(AppContext);

    const handleDelete = (index) => {
        const newImageUrls = [...imageUrls];
        newImageUrls.splice(index, 1);
        setImageUrls(newImageUrls);
    };

    return (
        <div className={styles.container}>
            <h2>Arrastra y suelta tus imágenes aquí</h2>
            {<Dropzone
                accept="image/*"
                onDrop={acceptedFiles => {
                    const newImageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
                    setImageUrls([...imageUrls, ...newImageUrls]);
                }}>
                {({ getRootProps, getInputProps }) => (
                    <section className={styles.section}>
                        {imageUrls.length < 4 ? <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</p>
                        </div> : <p>Maximo 4 Imagenes</p>}
                        { }
                    </section>
                )}
            </Dropzone>}
            <div className={styles.images}>
                {imageUrls.map((imageUrl, index) => (
                    <div key={index}>
                        <Image src={imageUrl} width={100} height={100} alt='img' />
                        <button onClick={() => handleDelete(index)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}