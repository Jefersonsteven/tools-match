import { useState } from "react";
import { uploadImage } from "./upload";

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    const url = await uploadImage(file);

    if (url) {
      setIsLoading(false);
      setImageUrl(url);
    } else {
      setIsLoading(false);
      setError("Error al subir la imagen");
    }
  };

  return {
    isLoading,
    error,
    imageUrl,
    handleUpload,
  };
};
