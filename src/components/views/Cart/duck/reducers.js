import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    STORE_CART,
    CLEAR_CART,
    REMOVE_ITEM_FROM_CART,
} from './types';

const lineItemTable = {};

export default (state = lineItemTable, { type, payload } = {}) => {
    let newCart = {};

    switch (type) {
        case INCREMENT_ITEM_IN_CART:
            if (!state[payload.name]) {
                return {
                    ...state,
                    [payload.name]: {
                        ...state[payload.name],
                        quantity: 1,
                    },
                };
            }
            return {
                ...state,
                [payload.name]: {
                    ...state[payload.name],
                    quantity: state[payload.name].quantity + 1,
                },
            };
        case DECREMENT_ITEM_IN_CART:
            if (state[payload.name]) {
                if (state[payload.name].quantity === 0) {
                    return state;
                }
                let newQuantity = state[payload.name].quantity - 1;
                if (newQuantity <= 0) {
                    newQuantity = 0;
                }
                return {
                    ...state,
                    [payload.name]: {
                        ...state[payload.name],
                        quantity: newQuantity,
                    },
                };
            }
            return state;
        case UPDATE_ITEM_AMOUNT_IN_CART:
            if (payload.quantity === state[payload.item.name].quantity) {
                return state;
            }
            if (payload.quantity >= 0) {
                return {
                    ...state,
                    [payload.item.name]: {
                        ...state[payload.item.name],
                        quantity: payload.quantity,
                    },
                };
            }
            return {
                ...state,
                [payload.item.name]: {
                    ...state[payload.item.name],
                    quantity: 0,
                },
            };
        case REMOVE_ITEM_FROM_CART:
            newCart = { ...state };

            delete newCart[payload.name];
            return newCart;
        case STORE_CART:
            payload.cart.forEach((lineItem) => {
                newCart[lineItem.name] = lineItem;
            });
            return newCart;

        case CLEAR_CART:
            return {};
        default:
            return state;
    }
};
