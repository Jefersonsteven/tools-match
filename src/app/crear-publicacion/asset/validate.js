export function validatePost(form, errors, setErrors) {
    const newErrors = { ...errors };

    //? Validate Title
    if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9/ ]{8,}$/.test(form.title)) newErrors.title = "Debe tener minimo 8 caracteres y sin simbolos";
    else newErrors.title = ""
    if (form.title === "") newErrors.title = "Llenar este espacio"

    //? Validate Description
    if (form.content.length <= 17 || form.content.length > 500) newErrors.content = "Debe tener entre 17 y 500 caracteres";
    else newErrors.content = ""
    if (form.content === "") newErrors.content = "Llenar este espacio"

    //? Validate Brand
    if (form.brand === "" || form.brand === "false") newErrors.brand = "Escoge una Marca";
    else newErrors.brand = ""

    //? Validate Price
    if (form.price === "0") newErrors.price = "El precio no puede ser 0";
    else newErrors.price = ""
    if (form.price === "") newErrors.price = "Llenar este espacio"

    //? Validate Category
    if (form.category === "" || form.category === "false") newErrors.category = "Escoge una categoria";
    else newErrors.category = ""

    //? Validate Images
    if (form.photo.length === 0) newErrors.photo = "Sube minimo una imagen";
    else newErrors.photo = ""

    //? Validate Type
    if (form.type === "") newErrors.type = "Escoge una opcion"
    else newErrors.type = ""

    //*
    setErrors(newErrors);
}