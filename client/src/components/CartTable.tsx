import React, { useContext } from 'react';
import { CartStore } from '../contexts/CartContext';
import '../assets/css/carttable.css';
import {BookItem, ShoppingCartItem} from "../types";
import { CartTypes } from '../reducers/CartReducer';
import { useNavigate } from 'react-router-dom';


const getBookImageUrl = (book: BookItem): string => {
    let name = book.title.toLowerCase();
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/:/g, "");
    return `${name}.gif`;
};


function CartTable() {
    const {cart, dispatch} = useContext(CartStore);
    const navigate = useNavigate();
    console.log(cart);
    // console.log(dispatch);
    const calculateTotalPrice = (book: BookItem, quantity: number): number => {
        return parseFloat((book.price * quantity).toFixed(2));
    };


    const handleRemoveFromCart = (id: number) => {
        dispatch({type: CartTypes.REMOVE, id: id});
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch({type: CartTypes.UPDATE_QUANTITY, id: id, quantity: quantity});
    };
    const continueShopping = () => {
        const lastVisitedCategory = localStorage.getItem('lastVisitedCategory');
        const categoryPath = lastVisitedCategory ? `/categories/${lastVisitedCategory}` : '/';
        console.log("Navigating to:", categoryPath);
        navigate(categoryPath);
    };

    return (

        <div className="cart-table">
            <div className="cart-table-header">
                <div className="header-book-information">Book Information/Price</div>
                <div className="header-quantity">Quantity</div>
                <div className="header-price">Subtotal</div>
                <div className="header-modify"></div>
            </div>
            {cart.map((item, index) => {
                const cartItem = item as ShoppingCartItem;
                let imageUrl;
                try {
                    imageUrl = require(`../assets/images/books/${getBookImageUrl(item.book)}`);
                } catch (error) {
                    imageUrl = require('../assets/images/books/access to health.gif');
                }

                return (
                    <div key={item.book.bookId} className="cart-item">
                        <div className="cart-book-image">
                            <img src={imageUrl} alt={item.book.title} />
                        </div>
                        <div className="cart-book-details">
                            <div className="cart-book-title">{item.book.title}</div>
                            <div className="cart-book-author">{item.book.author}</div>
                            <div className="cart-book-meta">
                                <div className="cart-book-price">${item.book.price.toFixed(2)}</div>
                                <div className="cart-book-quantity">
                                    <button onClick={() => handleQuantityChange(item.book.bookId, Math.max(0, item.quantity - 1))}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.book.bookId, item.quantity + 1)}>+</button>
                                </div>
                                <div className="cart-book-total">${calculateTotalPrice(item.book, item.quantity)}</div>
                                <button className="cart-item-remove" onClick={() => handleRemoveFromCart(item.book.bookId)}>Remove</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CartTable;





