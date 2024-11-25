import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: {
        welcome: "Welcome to Hotel Laxuli",
        bookNow: "Book Now",
        gallery: "Gallery", 
        reviews: "Guest Reviews",
      },
      footer: {
        copyright: "© 2024 Hotel Laxuli. All rights reserved.",
        followUs: "Follow us on",
      },
    },
  },
  es: {
    translation: {
      home: {
        welcome: "Bienvenidos ",
        bookNow: "Reserva ",
        gallery: "Galería", 
        reviews: "Reseñas ",
      },
      footer: {
        copyright: "© 2024 Hotel Laxuli. Todos los derechos reservados.",
        followUs: "Síguenos en",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Aquí usa "es" para español
  fallbackLng: "en", // Y "en" para inglés
  interpolation: {
    escapeValue: false, // React ya protege contra XSS
  },
});

export default i18n;
