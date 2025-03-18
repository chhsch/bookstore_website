import '../assets/css/carttable.css';
import CartTable from './CartTable';
import {useNavigate} from 'react-router-dom';
import {CartStore} from '../contexts/CartContext';
import React, {useContext} from 'react';
import {CartTypes} from '../reducers/CartReducer';


function Cart() {
    // hook from React Router to programmatically navigate between pages
    let navigate = useNavigate();
    const {cart} = useContext(CartStore);
    const {dispatch} = useContext(CartStore);

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to clear the cart?")) {
            dispatch({type: CartTypes.CLEAR});
        }
    };
    const cartTotal = cart.reduce((total, item) => total + item.book.price * item.quantity, 0).toFixed(2);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Function to redirect the user back to the last visited category page, stored in localStorage
    const continueShopping = () => {
        const lastVisitedCategory = localStorage.getItem('lastVisitedCategory');
        const categoryPath = lastVisitedCategory ? `/categories/${lastVisitedCategory}` : '/';
        console.log("Navigating to:", categoryPath);
        navigate(categoryPath);
    };

    const isEmpty = cart.length === 0;
    // The UI rendering part of the component
    return (
        <div>
            <h1>Cart Page</h1>
            {isEmpty ? (
                <div className="cart-empty-message">
                    <p>Your cart is empty.</p>
                    <button className="continue-shopping-button" onClick={() => navigate('/')}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <CartTable/>
                    <div className="cart-summary-container">
                        <div className="cart-summary">
                            <h3>Summary</h3>
                            <div className="cart-summary-item">
                                <span>Total Quantity</span>
                                <span>{totalQuantity}</span>
                            </div>
                            <div className="cart-summary-item">
                                <span>Total</span>
                                <span>${cartTotal}</span>
                            </div>
                            <button className="checkout-button" onClick={() => navigate('/checkout')}>
                                Go to Checkout
                            </button>

                        </div>

                    </div>
                    <button onClick={handleClearCart} className="clear-cart-button">
                        Clear Cart
                    </button>
                    <button onClick={continueShopping} className="continue-shopping-button">
                        Continue Shopping
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;

