import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticuloList = () => {
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/articulos')
            .then(response => {
                setArticulos(response.data); 
            })
            .catch(error => {
                console.error("Hubo un error al obtener los artículos:", error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Artículos</h1>
            <ul>
                {articulos.map((articulo) => (
                    <li key={articulo._id}>{articulo.nombre} - ${articulo.precio}</li>
                ))}
            </ul>
        </div>
    );
};

export default ArticuloList;
