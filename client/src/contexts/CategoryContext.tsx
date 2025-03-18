import {CategoryItem} from "../types";
import React, {createContext, ReactNode, useEffect, useState} from 'react';
import axios from 'axios';

// Creates a React Context that stores data globally across components
export const Category = createContext<CategoryItem[] | []>([]);
// it will show this context as 'CategoryContext' in the component tree (instead of Context.Provider)
Category.displayName = 'CategoryContext';

interface CategoryProviderProps {
    children: ReactNode;
}

// Defines Category Context Provider Component
function CategoryContext({children}: CategoryProviderProps) {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        // axios.get(`http://localhost:8080/ChihHsingBookstoreReactState/api/categories`)
        axios.get(`/ChihHsingBookstoreReactOrder/api/categories`)
            .then((result) => {
                console.log(result.data);
                setCategories(result.data)
            })
            .catch(console.error);
    }, []);
    return (
        // Category.Provider: Shares categories data to all children
        // value={categories}: The actual data being shared
        // {children}: Components that can now access the context
        <Category.Provider value={categories}>
            {children}
        </Category.Provider>

    );
}

export default CategoryContext;