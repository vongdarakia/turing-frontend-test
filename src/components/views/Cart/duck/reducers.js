import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    STORE_CART,
    CLEAR_CART,
    REMOVE_ITEM_FROM_CART,
} from './types';
import getCartItemKey from '../../../../utils/get-cart-item-key';

const lineItemTable = {};

export default (state = lineItemTable, { type, payload } = {}) => {
    let newCart = {};

    switch (type) {
        case INCREMENT_ITEM_IN_CART:
            if (!state[getCartItemKey(payload.item)]) {
                return {
                    ...state,
                    [getCartItemKey(payload.item)]: {
                        ...state[getCartItemKey(payload.item)],
                        quantity: 1,
                    },
                };
            }
            return {
                ...state,
                [getCartItemKey(payload.item)]: {
                    ...state[getCartItemKey(payload.item)],
                    quantity: state[getCartItemKey(payload.item)].quantity + 1,
                },
            };
        case DECREMENT_ITEM_IN_CART:
            if (state[getCartItemKey(payload.item)]) {
                if (state[getCartItemKey(payload.item)].quantity === 0) {
                    return state;
                }
                let newQuantity =
                    state[getCartItemKey(payload.item)].quantity - 1;
                if (newQuantity <= 0) {
                    newQuantity = 0;
                }
                return {
                    ...state,
                    [getCartItemKey(payload.item)]: {
                        ...state[getCartItemKey(payload.item)],
                        quantity: newQuantity,
                    },
                };
            }
            return state;
        case UPDATE_ITEM_AMOUNT_IN_CART:
            if (
                payload.quantity ===
                state[getCartItemKey(payload.item)].quantity
            ) {
                return state;
            }
            if (payload.quantity >= 0) {
                return {
                    ...state,
                    [getCartItemKey(payload.item)]: {
                        ...state[getCartItemKey(payload.item)],
                        quantity: payload.quantity,
                    },
                };
            }
            return {
                ...state,
                [getCartItemKey(payload.item)]: {
                    ...state[getCartItemKey(payload.item)],
                    quantity: 0,
                },
            };
        case REMOVE_ITEM_FROM_CART:
            newCart = { ...state };

            delete newCart[payload.name];
            return newCart;
        case STORE_CART:
            payload.cart.forEach((lineItem) => {
                newCart[getCartItemKey(lineItem)] = lineItem;
            });
            return newCart;

        case CLEAR_CART:
            return {};
        default:
            return state;
    }
};
