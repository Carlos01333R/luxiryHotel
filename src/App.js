import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ReservationForm from './components/ReservationForm';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';  
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n'; 
import PaymentDetails from './page/response';

function App() {
  const { t } = useTranslation(); 

  return (
    <Router>
      <Header /> { }
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserve" element={<ReservationForm />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} /> 
        <Route path="/response" element={<PaymentDetails />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
