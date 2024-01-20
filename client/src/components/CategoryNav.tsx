import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../types';
import { Category } from '../contexts/CategoryContext';



function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    return (
            <ul className="category-buttons">
                {categories.map((categoryItem: CategoryItem) => (
                    <li key={categoryItem.categoryId} className="booklist-item">
                        <Link to={`/categories/${categoryItem.name.toUpperCase()}`}>
                            {categoryItem.name}
                        </Link>
                    </li>
                ))}
            </ul>
    );
}
export default CategoryNav;

