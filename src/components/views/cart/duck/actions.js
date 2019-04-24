import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    STORE_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
} from './types';
import TuringAPI from '../../../../api';
import getCartItemKey from '../../../../utils/get-cart-item-key';

let timeout;

export const storeCart = (cart) => ({
    type: STORE_CART,
    payload: { cart },
});

export const clearCart = () => ({
    type: CLEAR_CART,
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
    const itemKeys = Object.keys(cart);
    const results = [];

    try {
        for (let index = 0; index < itemKeys.length; index += 1) {
            const itemKey = itemKeys[index];
            const { quantity, item_id } = cart[itemKey];

            results.push(TuringAPI.updateItemInCart({ item_id, quantity }));
        }
        await Promise.all(results);

        const updatedCart = await TuringAPI.getCart();

        dispatch(storeCart(updatedCart));

        return updatedCart;
    } catch (error) {
        return { error };
    }
};

export const incrementItemInCart = ({ name, attributes }) => async (
    dispatch,
) => {
    clearTimeout(timeout);

    dispatch({
        type: INCREMENT_ITEM_IN_CART,
        payload: { item: { name, attributes } },
    });
    // saves the cart only after the user is done incrementing to
    // have a smoother flow;
    timeout = setTimeout(() => dispatch(saveCart()), 800);
};

export const decrementItemInCart = ({ name, attributes }) => async (
    dispatch,
) => {
    clearTimeout(timeout);

    dispatch({
        type: DECREMENT_ITEM_IN_CART,
        payload: { item: { name, attributes } },
    });
    // saves the cart only after the user is done decrementing to
    // have a smoother flow;
    timeout = setTimeout(() => dispatch(saveCart()), 800);
};

export const removeItemFromCart = ({ name, attributes }) => async (
    dispatch,
    getState,
) => {
    const { cart } = getState();
    const itemKey = getCartItemKey({ name, attributes });
    if (cart[itemKey]) {
        dispatch({
            type: REMOVE_ITEM_FROM_CART,
            payload: { item: { name, attributes } },
        });

        const success = await TuringAPI.removeItemFromCart({
            item_id: cart[itemKey].item_id,
        });

        if (success) {
            dispatch(saveCart());
        }
    }
};

export const updateItemInCart = ({ name, amount }) => ({
    type: UPDATE_ITEM_AMOUNT_IN_CART,
    payload: {
        name,
        amount,
    },
});
