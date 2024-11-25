import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Header.css';
import './Dropdown.css';

const Header = () => {
    const { i18n } = useTranslation();
    const [showLanguages, setShowLanguages] = useState(false);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language); // Cambiar el idioma según el valor
        setShowLanguages(false); // Cierra el menú después de seleccionar el idioma
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>Hotel Laxuli</h1>
            </div>
            <nav className="nav-links">
                <Link to="/">{i18n.t('home.welcome')}</Link>
                <Link to="/reserve">{i18n.t('home.bookNow')}</Link>
                <Link to="/gallery">{i18n.t('home.gallery')}</Link> {/* Aquí se corrigió */}
                <Link to="/reviews">{i18n.t('home.reviews')}</Link>
            </nav>
            <div className="language-dropdown">
                <button onClick={() => setShowLanguages(!showLanguages)}>
                    {i18n.t('footer.followUs')}
                </button>
                {showLanguages && (
                    <div className="language-options">
                        <button onClick={() => changeLanguage('es')}>Español</button>
                        <button onClick={() => changeLanguage('en')}>English</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
