import { getBasicHeaders, apiUrl } from './config';
import prepareRequestBody from '../utils/prepare-request-body';
import { KEY_CART_ID } from '../components/views/Cart/duck/types';

const generateCartId = async () => {
    try {
        const response = await fetch(
            `${apiUrl}/shoppingcart/generateUniqueId`,
            {
                method: 'get',
                headers: getBasicHeaders(),
            },
        );

        const { cart_id } = await response.json();

        return { cart_id };
    } catch (error) {
        return { error };
    }
};

const addItemToCart = async ({ cart_id, product_id, attributes = '' }) => {
    try {
        const response = await fetch(`${apiUrl}/shoppingcart/add`, {
            method: 'post',
            headers: getBasicHeaders(),
            body: prepareRequestBody({
                cart_id,
                product_id,
                attributes,
            }),
        });
        const lineItems = response.json();
        return lineItems;
    } catch (error) {
        return { error };
    }
};

const getCartById = async ({ cart_id }) => {
    try {
        const response = await fetch(`${apiUrl}/shoppingcart/${cart_id}`, {
            method: 'get',
            headers: getBasicHeaders(),
        });
        const cart = await response.json();
        return cart;
    } catch (error) {
        return { error };
    }
};

const getCartId = async () => {
    let cart_id = window.localStorage[KEY_CART_ID];

    if (!cart_id) {
        ({ cart_id } = await generateCartId());
        window.localStorage[KEY_CART_ID] = cart_id;
    }
    return cart_id;
};

const getCart = async () => {
    try {
        if (window.localStorage[KEY_CART_ID]) {
            const cart_id = window.localStorage[KEY_CART_ID];
            const cart = await getCartById({ cart_id });

            return cart;
        }
        const cart_id = await generateCartId();

        window.localStorage[KEY_CART_ID] = cart_id;
        return [];
    } catch (error) {
        return { error };
    }
};

const emptyCart = async ({ cart_id } = {}) => {
    try {
        const response = await fetch(
            `${apiUrl}/shoppingcart/empty/${cart_id}`,
            {
                method: 'delete',
                headers: getBasicHeaders(),
            },
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return { error };
    }
};

const updateItemInCart = async ({ item_id, cart_id, quantity }) => {
    try {
        const response = await fetch(
            `${apiUrl}/shoppingcart/update/${item_id}`,
            {
                method: 'put',
                headers: getBasicHeaders(),
                body: prepareRequestBody({
                    cart_id,
                    quantity,
                }),
            },
        );

        const lineItems = await response.json();
        return lineItems;
    } catch (error) {
        return { error };
    }
};

const removeItemFromCart = async ({ item_id } = {}) => {
    try {
        const response = await fetch(
            `${apiUrl}/shoppingcart/removeProduct/${item_id}`,
            {
                method: 'delete',
                headers: getBasicHeaders(),
            },
        );
        return response.status === 200;
    } catch (error) {
        return { error };
    }
};

export default {
    generateCartId,
    addItemToCart,
    getCart,
    getCartById,
    getCartId,
    emptyCart,
    removeItemFromCart,
    updateItemInCart,
};
