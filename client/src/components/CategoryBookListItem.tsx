
import React, { useContext } from 'react';
import { BookItem } from "../types";
import { CartStore } from '../contexts/CartContext';
import { CartTypes } from '../reducers/CartReducer';
import read from "../assets/images/books/read.png";
import '../assets/css/CategoryBookListItem.css';
import '../assets/css/CategoryBookList.css';
import '../assets/css/CategoriesPage.css';

const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/'/g, "");
    name = name.replace(/,/g, "");
    name = name.replace(/:/g, "");
    return `${name}.gif`;
};

function CategoryBookListItem(props: BookItem) {
    const { dispatch } = useContext(CartStore);

    const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item: props, id: props.bookId });
    };

    return (
        <li className="book-box">
            <div className="book-image">
                <a href="#"><img src={require('../assets/images/books/' + bookImageFileName(props))} alt={props.title} /></a>
                {
                    props.isPublic && (
                        <button className="icon-right-top">
                            <a href="#"><img src={read} alt="read" /></a>
                        </button>
                    )
                }
            </div>
            <div className="book-details">
                <div className="book-title">{props.title}</div>
                <div className="book-author">{props.author}</div>
                <div className="book-price">${(props.price).toFixed(2)}</div>
                <button className="button-cat" onClick={addBookToCart}>Add to Cart</button>
            </div>
        </li>
    )
}

export default CategoryBookListItem;


