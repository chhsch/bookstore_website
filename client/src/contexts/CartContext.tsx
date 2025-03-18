import {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import {cartReducer,} from "../reducers/CartReducer";
import {ShoppingCartItem} from "../types";

// This sets an initial empty cart
const initialCartState: ShoppingCartItem[] = []
// Global context for cart
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

// debugging purposes
CartStore.displayName = 'CartContext';

// This defines a TypeScript type for the component props
type CartProviderProps = {
    children: ReactNode;
};

const storageKey = 'cart';

// It will provide cart and dispatch to the entire app using Context
export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
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
    // useReducer hook is used for advanced state management
    // cartReducer is a reducer function you define separately, handles how state changes
    // initializer is used to get initial value from localStorage
    // cart is the current state, dispatch is how to update the cart
    const [cart, dispatch] = useReducer(cartReducer, initialCartState, initializer);

    // Sync cart with localStorage
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart]);

    return (
        <CartStore.Provider value={{cart, dispatch}}>
            {children}
        </CartStore.Provider>
    );
};