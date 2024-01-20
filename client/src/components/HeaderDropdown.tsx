import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import downArrow from '../assets/images/site/down.png';
import { Category } from '../contexts/CategoryContext';
import { useNavigate } from 'react-router-dom';
function HeaderDropdown() {
    const location = useLocation();
    const { id } = useParams();
    const categories = useContext(Category);
    const navigate = useNavigate();
    const handleCategorySelect = (categoryName: string) => {
        localStorage.setItem('lastVisitedCategory', categoryName);
        navigate(`/categories/${categoryName}`);
    };
    if (location.pathname !== "/") {
        return null;
    }

    return (
        <div className="button-container">
            <div className="dropdown">
                <Link to="/categories/Health" className="no-underline">
                    <button className="button categories-button">
                        Categories
                        <img src={downArrow} alt="icon" className="down-arrow" />
                    </button>
                </Link>
                <ul className='categories-list'>
                    <li className="category-item"><Link to="/categories/Health" onClick={() => handleCategorySelect('Health')}>Health</Link></li>
                    <li className="category-item"><Link to="/categories/Children" onClick={() => handleCategorySelect('Children')}>Children</Link></li>
                    <li className="category-item"><Link to="/categories/Sports" onClick={() => handleCategorySelect('Sports')}>Sports</Link></li>
                    <li className="category-item"><Link to="/categories/Travel" onClick={() => handleCategorySelect('Travel')}>Travel</Link></li>
                    <li className="category-item"><Link to="/categories/E-books" onClick={() => handleCategorySelect('E-books')}>E-books</Link></li>
                </ul>
            </div>
                <button className="button categories-button no-wrap">
                    Best Seller
                    <img src={downArrow} alt="icon" className="down-arrow" />
                </button>
                <button className="button categories-button no-wrap">
                    New Arrival
                    <img src={downArrow} alt="icon" className="down-arrow" />
                </button>
                <button className="button categories-button no-wrap">
                    Blog
                    <img src={downArrow} alt="icon" className="down-arrow" />
                </button>
                <button className="button categories-button no-wrap">
                    Event
                    <img src={downArrow} alt="icon" className="down-arrow" />
                </button>


            </div>

    );
}

export default HeaderDropdown;
