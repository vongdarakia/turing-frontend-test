import { INCREMENT_ITEM_IN_CART, DECREMENT_ITEM_IN_CART } from './types';

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
        default:
            return state;
    }
};
