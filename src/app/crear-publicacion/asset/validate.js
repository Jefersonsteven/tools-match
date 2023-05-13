export function validatePost(form, errors, setErrors) {
    const newErrors = { ...errors };

    //? Validate Title
    if (!/^[a-zA-Z0-9/]{8,}$/.test(form.title)) newErrors.title = "Debe tener minimo 8 caracteres y sin simbolos";
    else newErrors.title = ""
    if (form.title === "") newErrors.title = "Llenar este espacio"

    //? Validate Description
    // /^(.{17, 500})$/.test(form.description)
    if (form.description.length <= 17 || form.description.length > 500) newErrors.description = "Debe tener entre 17 y 500 caracteres";
    else newErrors.description = ""
    if (form.description === "") newErrors.description = "Llenar este espacio"

    //? Validate Price
    if (form.price === "0") newErrors.price = "El precio no puede ser 0";
    else newErrors.price = ""
    if (form.price === "") newErrors.price = "Llenar este espacio"

    //? Validate Category
    if (form.category === "") newErrors.category = "Escoge una categoria";
    else newErrors.category = ""

    //? Validate Category
    if (form.images.length === 0) newErrors.images = "Sube minimo una imagen";
    else newErrors.images = ""

    //*
    setErrors(newErrors);
}