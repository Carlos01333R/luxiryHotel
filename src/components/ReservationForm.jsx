import React, { useState } from "react";
import "./ReservationForm.css";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: "",
    children: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
  });

  const [errors, setErrors] = useState([]);
  const [price, setPrice] = useState(0); // Estado para almacenar el precio total

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Recalcular el precio cuando cambien ciertos campos
    if (name === "roomType" || name === "adults" || name === "children") {
      const updatedFormData = { ...formData, [name]: value };
      calculatePrice(updatedFormData);
    }
  };

  const calculatePrice = (data) => {
    const basePrices = {
      standard: 90000,
      deluxe: 120000,
      suite: 150000,
    };

    const roomPrice = basePrices[data.roomType] || 0;
    const totalGuests =
      parseInt(data.adults || 0) + parseInt(data.children || 0);

    // Incremento por persona adicional
    const extraGuestPrice = totalGuests > 2 ? (totalGuests - 2) * 20000 : 0;

    setPrice(roomPrice + extraGuestPrice);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email)
      newErrors.email = "El correo electrónico es obligatorio.";
    if (!formData.phone) newErrors.phone = "El teléfono es obligatorio.";
    if (!formData.adults)
      newErrors.adults = "El número de adultos es obligatorio.";
    if (!formData.checkIn)
      newErrors.checkIn = "La fecha de entrada es obligatoria.";
    if (!formData.checkOut)
      newErrors.checkOut = "La fecha de salida es obligatoria.";
    if (!formData.roomType)
      newErrors.roomType = "Seleccione un tipo de habitación.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Configuración de ePayco
    const handler = window.ePayco.checkout.configure({
      key: "2a5742317f0bca04fecbeb0d887bf25d", // Reemplaza con tu clave pública de ePayco
      test: true, // Cambiar a false en producción
    });

    // Datos del pago
    const paymentData = {
      name: `Reserva ${formData.roomType}`,
      description: `Habitación ${formData.roomType}`,
      invoice: `RESERVA-${Date.now()}`,
      currency: "COP",
      amount: price, // Usa el precio calculado dinámicamente
      tax_base: "0",
      tax: "0",
      country: "CO",
      lang: "es",
      external: "false",
      extra1: formData.name,
      extra2: formData.email,
      extra3: formData.phone,
      email_billing: formData.email,
      name_billing: formData.name,
      mobilephone_billing: formData.phone,
      response: "https://luxiry-hotel.vercel.app/response",
      confirmation: "https://tu-backend.com/confirmacion-pago",
      method: "GET",
    };

    // Mostrar el formulario de pago de ePayco
    handler.open(paymentData);
  };

  return (
    <div className="reservation-container">
      <div className="reservation-card">
        <div className="reservation-header">
          <h3>Haz tu reserva en minutos</h3>
        </div>

        {errors.length > 0 && (
          <div className="error-list">
            {errors.map((err, index) => (
              <p key={index} className="error-message">
                {err}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="reservation-body">
          <div className="form-row">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingresa tu teléfono"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
            <div className="form-group">
              <label>Tipo de habitación</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
              >
                <option value="">Selecciona una opción</option>
                <option value="standard">Estándar</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
              {errors.roomType && (
                <span className="error-message">{errors.roomType}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Número de adultos</label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                placeholder="Número de adultos"
              />
              {errors.adults && (
                <span className="error-message">{errors.adults}</span>
              )}
            </div>
            <div className="form-group">
              <label>Número de niños</label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                placeholder="Número de niños"
              />
              {errors.children && (
                <span className="error-message">{errors.children}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de entrada</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
              />
              {errors.checkIn && (
                <span className="error-message">{errors.checkIn}</span>
              )}
            </div>
            <div className="form-group">
              <label>Fecha de salida</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
              />
              {errors.checkOut && (
                <span className="error-message">{errors.checkOut}</span>
              )}
            </div>
          </div>

          <div className="price-display">
            <strong>Precio total: </strong>COP {price.toLocaleString()}
          </div>

          <button type="submit" className="submit-button">
            Confirmar reserva
          </button>
        </form>
        <div className="reservation-footer">
          Por favor, revisa tus datos antes de enviar el formulario.
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
