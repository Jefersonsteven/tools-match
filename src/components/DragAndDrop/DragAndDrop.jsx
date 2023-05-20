import React, { useContext, useState } from "react";
import Dropzone from "react-dropzone";
import styles from "./DragAndDrop.module.css";
import Image from "next/image";
import { AppContext } from "@/context/AppContext";
import { validatePost } from "@/app/crear-publicacion/asset/validate";
import { AiFillCloseCircle } from "react-icons/ai";

export const DragAndDrop = ({ imagesPrint, setImagesPrint }) => {
  const { errors, setErrors, form, setForm } = useContext(AppContext);

  const handleDelete = (index) => {
    const newImageUrl = [...form.photo];
    const newImagePrint = [...imagesPrint];
    newImageUrl.splice(index, 1);
    newImagePrint.splice(index, 1);
    setForm({ ...form, photo: newImageUrl });
    setImagesPrint(newImagePrint);
    validatePost({ ...form, photo: [...newImageUrl] }, errors, setErrors);
  };

  return (
    <div className={styles.container}>
      <h2>Arrastra y suelta tus imágenes aquí</h2>
      {
        <Dropzone
          onDrop={(acceptedFiles) => {
            const imagesPrints = acceptedFiles.map((file) =>
              URL.createObjectURL(file)
            );
            setImagesPrint([...imagesPrint, ...imagesPrints]);
            setForm({ ...form, photo: [...form.photo, ...acceptedFiles] });
            validatePost(
              { ...form, photo: [...form.photo, ...acceptedFiles] },
              errors,
              setErrors
            );
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className={styles.section}>
              {form.photo.length < 4 ? (
                <div {...getRootProps()}>
                  <input accept={"image/*"} {...getInputProps()} />
                  <p>
                    Arrastra y suelta aquí o haz clic para seleccionar imagenes.
                  </p>
                </div>
              ) : (
                <p>Maximo 4 Imagenes</p>
              )}
            </section>
          )}
        </Dropzone>
      }
      <div className={styles.images}>
        {imagesPrint.map((imageUrl, index) => (
          <div key={index}>
            {imageUrl === undefined && <span>loading...</span>}
            <Image src={imageUrl} width={100} height={100} alt="img" />
            <div onClick={() => handleDelete(index)}>
              <AiFillCloseCircle size={30} color="var(--red)" />
            </div>
          </div>
        ))}
      </div>
      <span>{errors.photo}</span>
    </div>
  );
};
