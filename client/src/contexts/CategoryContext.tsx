
import {CategoryItem} from "../types";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// 創建名為 Category 的上下文
export const Category = createContext<CategoryItem[] | []>([]);
Category.displayName = 'CategoryContext';
interface CategoryProviderProps {
    children: ReactNode;
}

function CategoryContext({ children }: CategoryProviderProps) {
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
        <Category.Provider value={categories}>
            {children}
        </Category.Provider>

    );
}

export default CategoryContext;