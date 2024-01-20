
import CategoryBookListItem from './CategoryBookListItem';
import {BookItem} from "../types";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CategoryNav from './CategoryNav';
import { Category } from '../contexts/CategoryContext';
import CategoriesSidebar from "./CategoriesSidebar";

function CategoryBookList(){
    const {id} = useParams();
    const categories = useContext(Category);

    // axios.defaults.baseURL = 'http://localhost:8080/ChihHsingBookstoreReactState/api/';
    axios.defaults.baseURL = '/ChihHsingBookstoreReactTransact/api/';
    const [books, setBook] = useState([]);

    useEffect(() => {
        axios.get(`/categories/name/${id}/books`)
            .then((response) => setBook(response.data))
            .catch(error => {
                console.error("Error fetching books for category:", error);
            });
    }, [id]);

    return (

        <>
            <CategoriesSidebar />
            <CategoryNav />
            <div className="categories-page">
                <ul className="categories-main-content">
                    {books.map((book: BookItem) => (
                        <CategoryBookListItem  bookId={book.bookId} isPublic={book.isPublic} price={book.price} title={book.title} author={book.author} categoryId ={book.categoryId}/>))}
                </ul>
            </div>
        </>
    )
}

export default CategoryBookList;