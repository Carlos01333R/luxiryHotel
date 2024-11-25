import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';  // Importar íconos

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-info">
                    <p className="footer-title">¡Síguenos en nuestras redes sociales!</p>
                    <div className="social-media">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={30} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={30} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} />
                        </a>
                    </div>
                </div>

                <div className="footer-bar"></div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Hotel Laxuli | Todos los derechos reservados</p>
                    <p><a href="mailto:contacto@hotellaxuli.com">contacto@hotellaxuli.com</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
