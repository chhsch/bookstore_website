import React, {createContext, ReactNode, useReducer} from 'react';
import {OrderDetailsState} from '../types';

const initialState = {
    orderDetails: null,
};

// Creates a React context with a type-safe shape.
const OrderDetailsContext = createContext<{
    state: OrderDetailsState;
    dispatch: React.Dispatch<any>;
}>({state: initialState, dispatch: () => null});

// Allows other components to import and use this context with useContext(OrderDetailsContext)
export {OrderDetailsContext};

// reducer function
const orderDetailsReducer = (state: OrderDetailsState, action: { type: string; payload: any }): OrderDetailsState => {
    switch (action.type) {
        case 'UPDATE':
            return {...state, orderDetails: action.payload};
        case 'CLEAR':
            return {...state, orderDetails: null};
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// export const OrderDetailsContext = createContext();
interface OrderDetailsProviderProps {
    children: ReactNode;
}

// define context provider component
export const OrderDetailsProvider: React.FC<OrderDetailsProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(orderDetailsReducer, initialState);

    return (
        <OrderDetailsContext.Provider value={{state, dispatch}}>
            {children}
        </OrderDetailsContext.Provider>
    );
};