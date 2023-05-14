"use client";
import { useContext, useState } from "react";
import { useUpload } from "@/components/Cloudinary/useUpload";
import { AppContext } from "@/context/AppContext";
import { validatePost } from "../crear-publicacion/asset/validate";
import Image from "next/image";

const DragAndDrop2 = () => {
  const { errors, setErrors, form, imageUrls, setImageUrls } = useContext(AppContext);
  const { isLoading, error, imageUrl, handleUpload } = useUpload();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };

  const handleUploadComplete = (url) => {
    validatePost({ ...form, images: [...imageUrls, url] }, errors, setErrors)
    setImageUrls([...imageUrls, url]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {isLoading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {imageUrl && <Image src={imageUrl} alt="Imagen subida" width={100} height={100} />}
      {imageUrl && (
        <button onClick={() => handleUploadComplete(imageUrl)}>
          Agregar imagen
        </button>
      )}
      {imageUrls.length > 0 && (
        <div>
          <h2>Imágenes subidas</h2>
          <ul>
            {imageUrls.map((url, index) => (
              <li key={index}>
                <Image src={url} alt={`Imagen ${index}`} width={100} height={100} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <span>{errors.images}</span>
    </div>
  );
};

export default DragAndDrop2;
