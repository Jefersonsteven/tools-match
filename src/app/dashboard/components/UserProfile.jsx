"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import style from './UserProfile.module.css';

export default function User() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const handleDelete = () => {
        alert('Usuario Eliminado')
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:3000/api/admin/user/${id}`);
            setUser(response.data);
        };
        fetchData();
    }, [id]);

    if (!user) {
        console.log(id)
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className={style.userContainer}>
                <h1>{user.name}</h1>
                <h2>{user.telefono}</h2>
                <h2>{user.email}</h2>
                <h2>{user.reportes}</h2>
                <h2>{user.ordenes}</h2>
                <button className={style.userButton} onClick={() => handleDelete()}>Eliminar Usuario</button>
            </div>
        </div>
    );
};