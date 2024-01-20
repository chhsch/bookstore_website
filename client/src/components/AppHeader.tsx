import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import '../assets/css/HeaderDropdown.css';
import '../assets/css/AppFooter.css';
import '../assets/css/Home.css';
import logo from '../assets/images/site/logo.png';
import heart from '../assets/images/site/heart.png';
import Shopping from '../assets/images/site/shopping-bag.png';
import User from '../assets/images/site/user.png';
import search from '../assets/images/site/search.png';
import '../assets/css/AppHeader.css';
import '../assets/css/HeaderSearchBar.css';
import { Category } from '../contexts/CategoryContext';
import HeaderDropdown from './HeaderDropdown';
import { CartStore } from '../contexts/CartContext';


function AppHeader() {
    const categories = useContext(Category);
    const { cart } = useContext(CartStore);

    // Calculate the total quantity of items in the cart.
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="app-header">
            <div className="app-container">
                {/* Logo Section */}
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>

                {/* Search Bar */}
                <div className="title-and-search-bar">
                    <div className="search-container">
                        <input type="text" className="search-bar" placeholder="Search by Keyword" />
                        <button type="submit" className="search-button">
                            <img src={search} alt="Search Icon" className="search" />
                        </button>
                    </div>
                </div>

                {/* Action Icons */}
                <div className="action-icons">
                    <button className="icon-button like-button">
                        <i className="icon"><img src={heart} alt="Heart" className="icon-img" /></i>
                    </button>
                    <Link to="/cart" className="icon-button cart-button">
                        <img src={Shopping} alt="Shopping-bag" className="icon-img" />
                        <span className="cart-count">{cartQuantity}</span>
                    </Link>
                    <button className="icon-button login-button">
                        <i className="icon"><img src={User} alt="User" className="icon-img" /></i>
                        <span className="login-text-button">Login</span>
                    </button>
                </div>
            </div>
            <HeaderDropdown />
        </header>
    );
}

export default AppHeader;
