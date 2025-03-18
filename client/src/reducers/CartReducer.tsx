import {BookItem, ShoppingCartItem} from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY'
};

// Defines action type constants for reducer logic
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
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
                // If item is new → create a new ShoppingCartItem and add it to the array
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
                // If quantity > 1 → just decrease it
                if (state[itemIndexToRemove].quantity > 1) {
                    return state.map((item, index) =>
                        index === itemIndexToRemove
                            ? {...item, quantity: item.quantity - 1}
                            : item
                    );
                    // If quantity = 1 → remove the item completely
                } else {
                    return state.filter((_, index) => index !== itemIndexToRemove);
                }
            }
            return state;

        case CartTypes.CLEAR:
            return [];

        case CartTypes.UPDATE_QUANTITY:
            if (action.id !== undefined && action.quantity !== undefined) {
                return state.map((item) =>
                    item.id === action.id ? {...item, quantity: action.quantity!} : item
                );
            }
            return state;

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
