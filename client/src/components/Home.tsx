
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../assets/css/global.css';
import '../assets/css/Home.css';
import welcome from '../assets/images/site/1.png';
import book1 from '../assets/images/books/travels alaska.gif';
import book2 from '../assets/images/books/health and wellness.jpeg';
import book3 from '../assets/images/books/wonderful things you will be.gif';
import HeaderDropdown from "./HeaderDropdown";
import { Category } from '../contexts/CategoryContext';

function Home(){
    const categories = useContext(Category);
    const navigate = useNavigate();
    const handleShopNowClick = () => {
        navigate('/categories');
    }

    return (
        <>
            <HeaderDropdown />
            <div className="home-page">
                <img id="p1" src={welcome} alt="Description here" />
                <div className="overlay-text">
                    <span className="text-part1">Books Selection for</span>
                    <span className="text-part2">September</span>
                    <Link to="/categories/health">
                        <button className="shop-button">SHOP NOW</button>
                    </Link>
                </div>
                <div className="books">
                    <img className="book book1" src={book1} alt="Book 1" />
                    <img className="book book2" src={book2} alt="Book 2" />
                    <img className="book book3" src={book3} alt="Book 3" />
                </div>
            </div>
        </>
    );
}

export default Home;







