import React, { useContext } from 'react';
import '../assets/css/CategoryNav.css';
import '../assets/css/global.css';
import { Category } from '../contexts/CategoryContext';
import CategoryNav from './CategoryNav';
import { Link, useNavigate } from 'react-router-dom';


function CategoriesSidebar() {

    const categories = useContext(Category);
    const navigate = useNavigate();

    const handleCategorySelect = (categoryName: string) => {
        localStorage.setItem('lastVisitedCategory', categoryName);
        navigate(`/categories/${categoryName}`);
    };

    console.log(categories);
    return (
        <nav className="categories-sidebar">
            <ul className="category-buttons">
                <button className="booklist-item" onClick={() => handleCategorySelect('health')}><Link to="/categories/health">Health</Link></button>
                <button className="booklist-item" onClick={() => handleCategorySelect('children')}><Link to="/categories/children">Children</Link></button>
                <button className="booklist-item" onClick={() => handleCategorySelect('sports')}>Sports</button>
                <button className="booklist-item" onClick={() => handleCategorySelect('travel')}>Travel</button>
                <button className="booklist-item" onClick={() => handleCategorySelect('e-books')}>E-books</button>
            </ul>
            <CategoryNav />
        </nav>
    );
}

export default CategoriesSidebar;

