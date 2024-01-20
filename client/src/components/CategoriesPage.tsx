import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/CategoriesPage.css';

const CategoriesPage: React.FC = () => {
    const categories = ['Health', 'Children', 'Sports', 'Travel', 'E-books'];
    const navigate = useNavigate();
    const handleCategoryClick = (category: string) => {
        console.log('handleCategoryClick is triggered with category:', category);
        localStorage.setItem('lastVisitedCategory', category);
        console.log('Category set in localStorage:', localStorage.getItem('lastVisitedCategory'));
        navigate(`/categories/${category}`);
    };

    return (
        <div className="categories-page">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button
                                className="button selected-category-button"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
        </div>
    );
};

export default CategoriesPage;
