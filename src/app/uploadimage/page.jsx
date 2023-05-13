"use client";
import { useUpload } from "@/components/Cloudinary/useUpload";

const MyComponent = () => {
  const { isLoading, error, imageUrl, handleUpload } = useUpload();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {isLoading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Imagen subida" />}
      {imageUrl && <p>{imageUrl}</p>}
    </div>
  );
};

export default MyComponent;
