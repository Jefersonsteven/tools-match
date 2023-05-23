function validateForm(form, errors, setErros, setDisabled) {
    const newErrors = { ...errors };

    Object.keys(form).forEach(prop => {
        if(form[prop] === '') newErrors[prop] = "Rellenar este campo"
        else newErrors[prop] = ""
    })

    const email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if(!email.test(form.email)) newErrors.email = "Correo invalido"
    if(form.email === "") newErrors.email = "Rellenar este campo"

    setErros(newErrors);
    !Object.values(newErrors).some(error => error.length > 0) && setDisabled(false);
}

export default validateForm