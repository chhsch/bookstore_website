import {createContext, Dispatch, useReducer, ReactNode, useEffect} from "react";
import {cartReducer, } from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";

const initialCartState:ShoppingCartItem[] =  []
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

type CartProviderProps = {
    children: ReactNode;
};

const storageKey = 'cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // Initialize cart from local storage if present, otherwise use the initial state
    const initializer = (initialState: ShoppingCartItem[]) => {
        try {
            const storedCart = localStorage.getItem(storageKey);
            return storedCart ? JSON.parse(storedCart) : initialState;
        } catch (error) {
            console.error('Error parsing cart from localStorage', error);
            return initialState;
        }
    };

    const [cart, dispatch] = useReducer(cartReducer, initialCartState, initializer);

    // Update local storage whenever the cart changes
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart]);

    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
};