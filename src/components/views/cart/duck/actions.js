import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    ADD_ITEMS_TO_CART,
    KEY_CART_ID,
    STORE_CART,
} from './types';
import TuringAPI from '../../../../api';

export const storeCart = (cart) => ({
    type: STORE_CART,
    payload: { cart },
});

export const incrementItemInCart = ({ item_id }) => ({
    type: INCREMENT_ITEM_IN_CART,
    payload: { item_id },
});

export const decrementItemInCart = ({ item_id }) => ({
    type: DECREMENT_ITEM_IN_CART,
    payload: { item_id },
});

export const addItemsToCart = ({ cart_id, product_id, attributes }) => async (
    dispatch,
) => {
    const updatedCart = await TuringAPI.addItemToCart({
        cart_id,
        product_id,
        attributes,
    });

    dispatch(storeCart(updatedCart));
    return updatedCart;
};

export const saveCart = () => async (dispatch, getState) => {
    const { cart } = getState();
    const item_ids = Object.keys(cart);
    const results = [];

    try {
        for (let index = 0; index < item_ids.length; index += 1) {
            const item_id = item_ids[index];
            const { quantity } = cart[item_id];

            results.push(TuringAPI.updateItemInCart({ item_id, quantity }));
        }
        await Promise.all(results);

        const updatedCart = await TuringAPI.getCart();

        dispatch(storeCart(updatedCart));
    } catch (error) {
        console.error(error);
    }
};

export const updateItemInCart = (item, amount) => ({
    type: UPDATE_ITEM_AMOUNT_IN_CART,
    payload: {
        item,
        amount,
    },
});
