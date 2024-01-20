import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/carttable.css';
const Checkout = () => {
    let navigate = useNavigate();

    return (
        <div className="checkout-container">
            <h2>Check out page</h2>
            <p className="checkout-message">Confirmation</p>
            <button className="checkout-button" onClick={() => navigate('/cart')}>Back to Cart</button>
        </div>
    );
};

export default Checkout;