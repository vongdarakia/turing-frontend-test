import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    ADD_ITEMS_TO_CART,
} from './types';

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

export const addItemsToCart = (item, amount = 1) => ({
    type: ADD_ITEMS_TO_CART,
    payload: {
        item,
        amount,
    },
});

export const updateItemInCart = (item, amount) => ({
    type: UPDATE_ITEM_AMOUNT_IN_CART,
    payload: {
        item,
        amount,
    },
});
