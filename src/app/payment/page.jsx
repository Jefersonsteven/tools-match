'use client'
import { useState } from 'react';
import styles from './payment.module.css';
import validateForm from './assets/validateForm';

function Payment() {
    const [ disabled, setDisabled ] = useState(true);
    const [ gateway, setGateway ] = useState(false);

    const [ form, setForm ] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
    });

    const [ errors, setErros ] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
    });

    function handleForm(event){
        const name = event.target.name;
        const value = event.target.value;
        setForm({...form, [name]: value});
        validateForm({ ...form, [name]: value }, errors, setErros, setDisabled);
        
    }

    return ( 
        <main>
            <section className={styles.form}>
                <form action="">
                    <div>
                        <label htmlFor="">Nombre Completo:</label>
                        <input onChange={handleForm} type="text" value={form.fullname} name='fullname'/>
                        <span>{errors.fullname}</span>
                    </div>
                    <div>
                        <label htmlFor="">Correo:</label>
                        <input onChange={handleForm} type="email" value={form.email} name='email'/>
                        <span>{errors.email}</span>
                    </div>
                    <div>
                        <label htmlFor="">Celular:</label>
                        <input onChange={handleForm} type="number" value={form.phone} name='phone'/>
                        <span>{errors.phone}</span>
                    </div>
                    <div>
                        <label htmlFor="">Direccion:</label>
                        <input onChange={handleForm} type="text" value={form.address} name='address'/>
                        <span>{errors.address}</span>
                    </div>
                </form>
            </section>
            <section className={styles.payment}>
                <div className={styles.cart}>
                    <div className={styles.cartItems}>

                    </div>
                    <div>
                        <h3>TOTAL:</h3>
                        <h3>TOTAL</h3>
                    </div>
                </div>
                <div className={styles.gateway}>
                    <button onClick={()=>setGateway((state) => !state)} disabled={disabled}>Opciones de Pago</button>
                    { gateway &&
                        <div>
                            <button>Contra Entrega</button>
                            <button>Tarjeta de credito</button>
                            <button>Mercado Pago</button>
                        </div>
                    }
                </div>
            </section>
        </main>
    );
}

export default Payment;