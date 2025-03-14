
import React from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home';
import CategoryBookList from './components/CategoryBookList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import './types';
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from './components/ConfirmationPage';
import { OrderDetailsProvider } from './contexts/OrderDetailsContext';



function App() {
    return (
        <CartProvider>
            <OrderDetailsProvider>
                <Router basename="/ChihHsingBookstoreReactTransact">
                    <AppHeader />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/categories/:id" element={<CategoryBookList />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/confirmation" element={<ConfirmationPage />} />
                        <Route path="*" element={<div>Page Not Found</div>} />
                    </Routes>

                    <AppFooter />
                </Router>
            </OrderDetailsProvider>
        </CartProvider>
    );
}

export default App;
