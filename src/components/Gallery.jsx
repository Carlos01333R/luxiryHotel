import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

function Gallery() {
    const [roomType, setRoomType] = useState("all"); 
    const navigate = useNavigate();

    const handleRoomClick = (roomType) => {
        setRoomType(roomType);
    };

    const handleImageClick = (type) => {
        // Redirigir al formulario de reservas con el tipo de habitación como parámetro
        navigate(`/reserve?roomType=${type}`);
    };

    const images = {
        all: [
            { src: "/images/habitacion.jpg", alt: "Habitacion", type: "standard" },
            { src: "/images/piscina.jpg", alt: "Piscina", type: "deluxe" },
            { src: "/images/eeee 2.jpg", alt: "Comedor", type: "suite" },
            { src: "/images/erda.jpg", alt: "Vista Exterior", type: "standard" },
        ],
        standard: [
            { src: "/images/habitacion.jpg", alt: "Estándar 1", type: "standard" },
            { src: "/images/habitacion.jpg", alt: "Estándar 2", type: "standard" },
        ],
        deluxe: [
            { src: "/images/eeee 2.jpg", alt: "Deluxe 1", type: "deluxe" },
            { src: "/images/eeee 2.jpg", alt: "Deluxe 2", type: "deluxe" },
        ],
        suite: [
            { src: "/images/erda.jpg", alt: "Suite 1", type: "suite" },
            { src: "/images/erda.jpg", alt: "Suite 2", type: "suite" },
        ],
    };

    return (
        <div className="container">
            <h2>Galería</h2>
            <div>
                <Dropdown
                    label="Habitaciones Disponibles"
                    options={[
                        { value: "all", label: "Ver Todo" },
                        { value: "standard", label: "Habitaciones Estándar" },
                        { value: "deluxe", label: "Habitaciones Deluxe" },
                        { value: "suite", label: "Habitaciones Suite" },
                    ]}
                    onSelect={handleRoomClick}
                />
            </div>
            <div className="gallery">
                {images[roomType].map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        onClick={() => handleImageClick(image.type)} 
                        style={{ cursor: "pointer" }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Gallery;
