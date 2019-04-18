import { INCREMENT_ITEM_IN_CART, DECREMENT_ITEM_IN_CART } from './types';

export const incrementItemInCart = (item) => ({
    type: INCREMENT_ITEM_IN_CART,
    payload: {
        item,
    },
});

export const decrementItemInCart = (item) => ({
    type: DECREMENT_ITEM_IN_CART,
    payload: {
        item,
    },
});
