import { ShoppingCartItem, BookItem } from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY'
};

type AppActions = {
    type: 'ADD' | 'REMOVE' | 'CLEAR' | 'UPDATE_QUANTITY';
    item?: BookItem;
    id?: number;
    quantity?: number;
}

export const cartReducer = (state: ShoppingCartItem[], action: AppActions): ShoppingCartItem[] => {
    switch (action.type) {
        case CartTypes.ADD:
            const existingItemIndex = state.findIndex(item => item.book.bookId === action.item?.bookId);
            if (existingItemIndex !== -1) {
                // Increase quantity of existing item
                return state.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                if (action.item) {
                    const newItem = new ShoppingCartItem(action.item);
                    return [...state, newItem];
                }
                return state;
            }

        case CartTypes.REMOVE:
            const itemIndexToRemove = state.findIndex(item => item.book.bookId === action.id);
            if (itemIndexToRemove !== -1) {
                if (state[itemIndexToRemove].quantity > 1) {
                    // Decrease quantity
                    return state.map((item, index) =>
                        index === itemIndexToRemove
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    // Remove item from cart
                    return state.filter((_, index) => index !== itemIndexToRemove);
                }
            }
            return state;

        case CartTypes.CLEAR:
            return [];

        case CartTypes.UPDATE_QUANTITY:
            if (action.id !== undefined && action.quantity !== undefined) {
                return state.map((item) =>
                    item.id === action.id ? { ...item, quantity: action.quantity! } : item
                );
            }
            return state;

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
