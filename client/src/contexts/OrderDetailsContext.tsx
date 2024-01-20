


import React, { createContext, useReducer, ReactNode } from 'react';
import { OrderDetailsState, OrderDetailsAction } from '../types';
const initialState = {
    orderDetails: null,
};
const OrderDetailsContext = createContext<{
    state: OrderDetailsState;
    dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });
export { OrderDetailsContext };
const orderDetailsReducer = (state: OrderDetailsState, action: {type: string; payload: any}): OrderDetailsState => {
    switch (action.type) {
        case 'UPDATE':
            // Handle the 'UPDATE' action
            return { ...state, orderDetails: action.payload };
        case 'CLEAR':
            // Handle the 'CLEAR' action
            return { ...state, orderDetails: null };
        // Add other cases as needed
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// export const OrderDetailsContext = createContext();
interface OrderDetailsProviderProps {
    children: ReactNode;
}
export const OrderDetailsProvider: React.FC<OrderDetailsProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(orderDetailsReducer, initialState);

    return (
        <OrderDetailsContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderDetailsContext.Provider>
    );
};