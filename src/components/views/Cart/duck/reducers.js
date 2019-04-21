import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    ADD_ITEMS_TO_CART,
    STORE_CART,
    CLEAR_CART,
} from './types';

const lineItemTable = {};

export default (state = lineItemTable, { type, payload } = {}) => {
    const newCart = {};

    switch (type) {
        case INCREMENT_ITEM_IN_CART:
            if (!state[payload.item_id]) {
                return {
                    ...state,
                    [payload.item_id]: {
                        ...state[payload.item_id],
                        quantity: 1,
                    },
                };
            }
            return {
                ...state,
                [payload.item_id]: {
                    ...state[payload.item_id],
                    quantity: state[payload.item_id].quantity + 1,
                },
            };
        case DECREMENT_ITEM_IN_CART:
            if (state[payload.item_id]) {
                if (state[payload.item_id].quantity === 0) {
                    return state;
                }
                let newQuantity = state[payload.item_id].quantity - 1;
                if (newQuantity <= 0) {
                    newQuantity = 0;
                }
                return {
                    ...state,
                    [payload.item_id]: {
                        ...state[payload.item_id],
                        quantity: newQuantity,
                    },
                };
            }
            return state;
        case ADD_ITEMS_TO_CART:
            if (!state[payload.item.product_id]) {
                return {
                    ...state,
                    [payload.item.product_id]: {
                        item: payload.item,
                        quantity: payload.quantity,
                    },
                };
            }
            return {
                ...state,
                [payload.item.product_id]: {
                    item: payload.item,
                    quantity:
                        state[payload.item.product_id].quantity +
                        payload.quantity,
                },
            };
        case UPDATE_ITEM_AMOUNT_IN_CART:
            if (payload.quantity === state[payload.item.product_id].quantity) {
                return state;
            }
            if (payload.quantity >= 0) {
                return {
                    ...state,
                    [payload.item.product_id]: {
                        item: payload.item,
                        quantity: payload.quantity,
                    },
                };
            }
            return {
                ...state,
                [payload.item.product_id]: {
                    item: payload.item,
                    quantity: 0,
                },
            };
        case STORE_CART:
            payload.cart.forEach((lineItem) => {
                newCart[lineItem.item_id] = lineItem;
            });
            return newCart;

        case CLEAR_CART:
            return {};
        default:
            return state;
    }
};
