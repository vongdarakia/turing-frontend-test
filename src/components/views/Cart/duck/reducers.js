import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    ADD_ITEMS_TO_CART,
} from './types';

const lineItemTable = {};

export default (state = lineItemTable, { type, payload } = {}) => {
    switch (type) {
        case INCREMENT_ITEM_IN_CART:
            if (!state[payload.item.product_id]) {
                return {
                    ...state,
                    [payload.item.product_id]: {
                        item: payload.item,
                        amount: 1,
                    },
                };
            }
            return {
                ...state,
                [payload.item.product_id]: {
                    item: payload.item,
                    amount: state[payload.item.product_id].amount + 1,
                },
            };
        case DECREMENT_ITEM_IN_CART:
            if (state[payload.item.product_id]) {
                if (state[payload.item.product_id].amount === 0) {
                    return state;
                }
                let newAmount = state[payload.item.product_id].amount - 1;
                if (newAmount <= 0) {
                    newAmount = 0;
                }
                return {
                    ...state,
                    [payload.item.product_id]: {
                        item: payload.item,
                        amount: newAmount,
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
                        amount: payload.amount,
                    },
                };
            }
            return {
                ...state,
                [payload.item.product_id]: {
                    item: payload.item,
                    amount:
                        state[payload.item.product_id].amount + payload.amount,
                },
            };
        case UPDATE_ITEM_AMOUNT_IN_CART:
            if (payload.amount === state[payload.item.product_id].amount) {
                return state;
            }
            if (payload.amount >= 0) {
                return {
                    ...state,
                    [payload.item.product_id]: {
                        item: payload.item,
                        amount: payload.amount,
                    },
                };
            }
            return {
                ...state,
                [payload.item.product_id]: {
                    item: payload.item,
                    amount: 0,
                },
            };
        default:
            return state;
    }
};
