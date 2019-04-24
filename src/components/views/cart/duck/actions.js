import {
    INCREMENT_ITEM_IN_CART,
    DECREMENT_ITEM_IN_CART,
    UPDATE_ITEM_AMOUNT_IN_CART,
    STORE_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
} from './types';
import TuringAPI from '../../../../api';

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
    const itemNames = Object.keys(cart);
    const results = [];

    try {
        for (let index = 0; index < itemNames.length; index += 1) {
            const name = itemNames[index];
            const { quantity, item_id } = cart[name];

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

export const incrementItemInCart = (name) => async (dispatch) => {
    clearTimeout(timeout);

    dispatch({
        type: INCREMENT_ITEM_IN_CART,
        payload: { name },
    });
    // saves the cart only after the user is done incrementing to
    // have a smoother flow;
    timeout = setTimeout(() => dispatch(saveCart()), 800);
};

export const decrementItemInCart = (name) => async (dispatch) => {
    clearTimeout(timeout);

    dispatch({
        type: DECREMENT_ITEM_IN_CART,
        payload: { name },
    });
    // saves the cart only after the user is done decrementing to
    // have a smoother flow;
    timeout = setTimeout(() => dispatch(saveCart()), 800);
};

export const removeItemFromCart = (name) => async (dispatch, getState) => {
    const { cart } = getState();
    if (cart[name]) {
        dispatch({
            type: REMOVE_ITEM_FROM_CART,
            payload: { name },
        });

        const success = await TuringAPI.removeItemFromCart({
            item_id: cart[name].item_id,
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
