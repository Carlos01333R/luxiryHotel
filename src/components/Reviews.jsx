import React, { useState } from 'react';
import './Reviews.css'; 

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.trim()) {
            setReviews([...reviews, newReview]);
            setNewReview('');
            alert('Reseña enviada con éxito.');
        }
    };

    return (
        <div className="reviews container">
            <h2>Reseñas de Clientes</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="review-input"  // Nueva clase para aplicar estilos
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Escribe tu reseña aquí"
                    rows="6"  // Ajusta las filas (altura)
                    required
                ></textarea>
                <button type="submit">Enviar Reseña</button>
            </form>
            <div className="reviews-list">
                <h3>Reseñas:</h3>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <p key={index}>"{review}"</p>
                    ))
                ) : (
                    <p>No hay reseñas todavía.</p>
                )}
            </div>
        </div>
    );
}

export default Reviews;
