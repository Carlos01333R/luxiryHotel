import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown({ label, options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label);

    const handleOptionClick = (value, label) => {
        setSelectedOption(label); // Actualiza el texto del botón
        setIsOpen(false); // Cierra el dropdown
        onSelect(value); // Llama a la función onSelect con el valor seleccionado
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption} ▾
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {options.map((option, index) => (
                        <a
                            key={index}
                            href="#!"
                            onClick={() => handleOptionClick(option.value, option.label)}
                        >
                            {option.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
